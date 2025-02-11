from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import main  # Import the main module for eye tracking functionality

app = Flask(__name__)
CORS(app)

# Global variables
cap = None
is_streaming = False

# Initialize MediaPipe FaceMesh
mp_face_mesh = mp.solutions.face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)

def process_frame(frame):
    if frame is None:
        return frame
    
    # Convert to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img_h, img_w = frame.shape[:2]
    
    # Process the frame with MediaPipe
    results = mp_face_mesh.process(rgb_frame)
    
    if results.multi_face_landmarks:
        # Convert landmarks to numpy array
        mesh_points = np.array([
            np.multiply([p.x, p.y], [img_w, img_h]).astype(int)
            for p in results.multi_face_landmarks[0].landmark
        ])
        
        # Get 3D landmarks
        mesh_points_3D = np.array(
            [[n.x, n.y, n.z] for n in results.multi_face_landmarks[0].landmark]
        )
        
        # Calculate blink ratio using main.py function
        eyes_aspect_ratio = main.blinking_ratio(mesh_points_3D)
        
        # Update blink counter if eyes are closed
        if eyes_aspect_ratio <= main.BLINK_THRESHOLD:
            main.EYES_BLINK_FRAME_COUNTER += 1
            if main.EYES_BLINK_FRAME_COUNTER >= main.EYE_AR_CONSEC_FRAMES:
                main.TOTAL_BLINKS += 1
                main.EYES_BLINK_FRAME_COUNTER = 0
        else:
            main.EYES_BLINK_FRAME_COUNTER = 0
        
        # Draw facial landmarks and eye tracking features
        for point in mesh_points:
            cv2.circle(frame, tuple(point), 1, (0, 255, 0), -1)
            
        # Process iris landmarks
        for eye_points in [main.LEFT_IRIS, main.RIGHT_IRIS]:
            (cx, cy), radius = cv2.minEnclosingCircle(mesh_points[eye_points])
            center = np.array([cx, cy], dtype=np.int32)
            cv2.circle(frame, center, int(radius), (255, 0, 255), 2, cv2.LINE_AA)
        
        # Add text overlays
        cv2.putText(frame, f"Blinks: {main.TOTAL_BLINKS}", (30, 80),
                  cv2.FONT_HERSHEY_DUPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
        
        # Estimate head pose
        if hasattr(main, 'estimate_head_pose'):
            pitch, yaw, roll = main.estimate_head_pose(mesh_points, (img_h, img_w))
            cv2.putText(frame, f"Head Pose - Pitch: {pitch:.1f}, Yaw: {yaw:.1f}, Roll: {roll:.1f}",
                      (30, 120), cv2.FONT_HERSHEY_DUPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
    
    return frame

def generate_frames():
    global cap, is_streaming
    while is_streaming:
        success, frame = cap.read()
        if not success:
            break
        
        # Process frame with eye tracking
        frame = process_frame(frame)
        
        # Convert to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start', methods=['POST'])
def start_stream():
    global cap, is_streaming
    try:
        if not is_streaming:
            cap = cv2.VideoCapture(0)
            if not cap.isOpened():
                return jsonify({"status": "error", "message": "Failed to open camera"}), 500
            is_streaming = True
            return jsonify({"status": "success", "message": "Stream started"})
        return jsonify({"status": "error", "message": "Stream already running"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/stop', methods=['POST'])
def stop_stream():
    global cap, is_streaming
    if is_streaming:
        is_streaming = False
        if cap:
            cap.release()
        return jsonify({"status": "success", "message": "Stream stopped"})
    return jsonify({"status": "error", "message": "No stream running"})

@app.route('/status')
def get_status():
    return jsonify({
        "isStreaming": is_streaming,
        "totalBlinks": main.TOTAL_BLINKS if hasattr(main, 'TOTAL_BLINKS') else 0
    })

if __name__ == '__main__':
    print("Starting server on http://localhost:5000")
    app.run(host='localhost', port=5000, debug=True) 