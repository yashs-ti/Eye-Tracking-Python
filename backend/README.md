# Python-Gaze-Face-Tracker

### Advanced Real-Time Eye, Facial Landmark, Head Pose, Gaze Direction Tracking System

---
![image](https://github.com/alireza787b/Python-Gaze-Face-Tracker/assets/30341941/08db0391-c13f-4252-9a88-9d32b77181b9)
![image](https://github.com/alireza787b/Python-Gaze-Face-Tracker/assets/30341941/8ad43aa9-dd3f-48b5-9e61-e375bc1db70f)


<img src="https://github.com/alireza787b/Python-Gaze-Face-Tracker/assets/30341941/0e4b8068-9d80-4573-b5e7-2a2a6061c594" style="text-align:center">

![image](https://github.com/alireza787b/Python-Gaze-Face-Tracker/assets/30341941/ce20ac3a-6785-448e-85df-4d2dd5f22040)

## Description
**Python-Gaze-Face-Tracker**  is a Python-based application designed for advanced real-time eye tracking, facial landmark detection, and head position (orientation) estimator and gaze estimation using OpenCV and MediaPipe technology. Specializing in uncalibrated gaze tracking and head orientation analysis this tool is an easy-to-use Python eye and facial landmark tracker. It excels in visualizing iris positions and offers robust logging capabilities for both eye and facial landmark data. Equipped with the ability to transmit this iris and gaze information over UDP sockets, Python-Gaze-Face-Tracker stands out for various applications, including aviation, human-computer interaction (HCI), and augmented reality (AR). The tool also includes a blink detection feature, contributing to detailed eye movement analysis and supporting head tracking. This makes it a comprehensive package for advanced gaze tracking and facial feature analysis in interactive technology applications.



---

## Features
- **Real-Time Eye Tracking**: Tracks and visualizes iris and eye corner positions in real-time using webcam input.
- **Facial Landmark Detection**: Detects and displays up to 468 facial landmarks.
- **Data Logging**: Records tracking data to CSV files, including timestamps, eye positions, and optional facial landmark data. *Note: Enabling logging of all 468 facial landmarks can result in large log files.*
- **Socket Communication**: Supports transmitting only iris tracking data via UDP sockets for integration with other systems or applications.
- **Blink Detection**: Monitors and records blink frequency, enhancing eye movement analysis.
- **Real-Time Head Pose Estimation**: Accurately estimates the roll, pitch, and yaw of the user's head in real-time.
- **Filtering and Smoothing**: Implements filtering and smoothing algorithms to ensure stable and accurate head orientation readings.
- **Gaze Estimation**: Visualizes the direction of gaze by projecting a 3D point from the nose tip onto the 2D camera plane.
- **Custom Real-Time Facial Landmark Visualization**: Utilize the `mediapipe_landmarks_test.py` script to visualize and track each of the MediaPipe facial landmark indices in real time. This feature is particularly useful for identifying the most relevant facial landmarks for your project and observing them directly in the video feed.

---

## Requirements
- Python 3.x
- OpenCV (opencv-python)
- MediaPipe (mediapipe)
- Other Python standard libraries: `math`, `socket`, `argparse`, `time`, `csv`, `datetime`, `os`

---
## Tutorial Video
🎥 **Watch the Setup and Usage Tutorial**: Discover how to install and use the Python-Gaze-Face-Tracker with our step-by-step video guide on YouTube: [Watch Tutorial](https://www.youtube.com/watch?v=UgC2GggTks0)

This video tutorial will walk you through the installation process, demonstrate how to run the code, and show you the real-time tracking features in action.


---

## Installation & Usage

1. **Clone the Repository:**
   ```
   git clone https://github.com/alireza787b/Python-Gaze-Face-Tracker.git
   ```

2. **Navigate to the Repository Directory:**
   ```
   cd Python-Gaze-Face-Tracker
   ```

3. **Install Dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the Application:**
   ```
   python main.py
   ```

   Optionally, specify the camera source:
   ```
   python main.py -c <camera_source_number>
   ```

5. **Open in VS Code:**
   ```
   code .
   ```
      Optionally, open the project in VS Code:




---

## Parameters
- **USER_FACE_WIDTH**: The horizontal distance between the outer edges of the user's cheekbones in millimeters. Adjust this value based on your face width for accurate head pose estimation.
- **NOSE_TO_CAMERA_DISTANCE**: The distance from the tip of the nose to the camera lens in millimeters. Intended for future enhancements.
- **PRINT_DATA**: Enable or disable console data printing for debugging.
- **DEFAULT_WEBCAM**: Default camera source index. '0' usually refers to the built-in webcam.
- **SHOW_ALL_FEATURES**: Display all facial landmarks on the video feed if set to True.
- **LOG_DATA**: Enable or disable logging of data to a CSV file.
- **LOG_ALL_FEATURES**: Log all facial landmarks to the CSV file if set to True.
- **ENABLE_HEAD_POSE**: Enable the head position and orientation estimator.
- **LOG_FOLDER**: Directory for storing log files.
- **SERVER_IP**: IP address for UDP data transmission (default is localhost).
- **SERVER_PORT**: Port number for the server to listen on.
- **SHOW_ON_SCREEN_DATA**: Display blink count and head pose angles on the video feed if set to True.
- **EYES_BLINK_FRAME_COUNTER**: Counter for consecutive frames with detected potential blinks.
- **BLINK_THRESHOLD**: Eye aspect ratio threshold for blink detection.
- **EYE_AR_CONSEC_FRAMES**: Number of consecutive frames below the threshold required to confirm a blink.
- **MIN_DETECTION_CONFIDENCE**: Confidence threshold for model detection.
- **MIN_TRACKING_CONFIDENCE**: Confidence threshold for model tracking.
- **MOVING_AVERAGE_WINDOW**: Number of frames for calculating the moving average for smoothing angles.
- **SHOW_BLINK_COUNT_ON_SCREEN**: Toggle to show the blink count on the video feed.
- **IS_RECORDING**: Controls whether data is being logged automatically. Set to false to wait for the 'r' command to start logging.
- **SERVER_ADDRESS**: Tuple containing the SERVER_IP and SERVER_PORT for UDP communication.


---

## Interactive Commands

While running the Eye Tracking and Head Pose Estimation script, you can interact with the program using the following keyboard commands:

- **'c' Key**: Calibrate Head Pose
  - Pressing the 'c' key recalibrates the head pose estimation to the current orientation of the user's head. This sets the current head pose as the new reference point.

- **'r' Key**: Start/Stop Recording
  - Toggling the 'r' key starts or pauses the recording of data to log folder. 

- **'q' Key**: Quit Program
  - Pressing the 'q' key will exit the program. 


---
## Data Logging & Telemetry
- **CSV Logging**: The application generates CSV files with tracking data including timestamps, eye positions, and optional facial landmarks. These files are stored in the `logs` folder.

- **UDP Telemetry**: The application sends iris position data through UDP sockets as defined by `SERVER_IP` and `SERVER_PORT`. The data is sent in the following order: [Timestamp, Left Eye Center X, Left Eye Center Y, Left Iris Relative Pos Dx, Left Iris Relative Pos Dy].

### UDP Packet Structure
- **Packet Type**: Mixed (int64 for timestamp, int32 for other values)
- **Packet Structure**: 
  - Timestamp (int64)
  - Left Eye Center X (int32)
  - Left Eye Center Y (int32)
  - Left Iris Relative Pos Dx (int32)
  - Left Iris Relative Pos Dy (int32)
- **Packet Size**: 24 bytes (8 bytes for int64 timestamp, 4 bytes each for the four int32 values)

### Example Packets
- **Example**: 
  - Timestamp: 1623447890123
  - Left Eye Center X: 315
  - Left Eye Center Y: 225
  - Left Iris Relative Pos Dx: 66
  - Left Iris Relative Pos Dy: -3
  - Packet: [1623447890123, 315, 225, 66, -3]
  


---

## Acknowledgements
This project was initially inspired by [Asadullah Dal's iris segmentation project](https://github.com/Asadullah-Dal17/iris-Segmentation-mediapipe-python).
The blink detection and gaze direction visualization feature is also contributed by Asadullah Dal.

---

## Note
The **Python-Gaze-Face-Tracker** is intended for educational and research purposes and is particularly suited for applications in aviation, HCI, AR, and similar fields.

---

# Eye Tracking System

A real-time eye tracking system with a React frontend and Python backend.

## Project Structure

```
.
├── backend/
│   ├── main.py            # Core eye tracking and head pose estimation
│   ├── camera_server.py   # Flask server for web integration
│   ├── AngleBuffer.py     # Angle smoothing utilities
│   ├── mediapipe_landmarks_test.py  # Landmark visualization utility
│   └── requirements.txt   # Python dependencies
└── eye-tracking-frontend/ # React frontend application
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── main.jsx      # React entry point
    │   └── index.css     # Global styles
    ├── package.json      # Node.js dependencies
    └── server.js         # WebSocket server for real-time data
```

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a Python virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Python backend server:
```bash
python camera_server.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd eye-tracking-frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run start
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Click the "Start Camera" button to begin eye tracking
3. The application will display:
   - Real-time video feed with eye tracking visualization
   - Eye position data (coordinates and movement)
4. Click "Stop Camera" to end the session

## Features

- Real-time eye tracking using MediaPipe Face Mesh
- WebSocket communication for live data updates
- Modern React frontend with Tailwind CSS
- Flask backend for video processing
- UDP socket communication for eye tracking data

## Requirements

- Python 3.7+
- Node.js 14+
- Webcam
- Modern web browser
