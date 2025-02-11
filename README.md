# Eye Tracking System with Web Interface

A real-time eye tracking system that combines Python-based eye tracking with a modern web interface. This project uses MediaPipe for facial landmark detection and React for the frontend interface.

## Features

- Real-time eye tracking and gaze detection
- Head pose estimation
- Blink detection and counting
- Speaking detection
- Modern web interface with live video feed
- Real-time statistics display

## Project Structure

```
.
├── backend/
│   ├── main.py              # Core eye tracking functionality
│   ├── camera_server.py     # Flask server for web interface
│   ├── AngleBuffer.py       # Angle smoothing utilities
│   └── requirements.txt     # Python dependencies
│
└── eye-tracking-frontend/   # React frontend application
    ├── src/
    │   ├── App.jsx         # Main React component
    │   ├── main.jsx        # React entry point
    │   └── index.css       # Global styles
    └── package.json        # Node.js dependencies
```

## Prerequisites

- Python 3.7 or higher
- Node.js 14 or higher
- Webcam
- Modern web browser (Chrome recommended)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a Python virtual environment (recommended):
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python camera_server.py
```
The backend server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd eye-tracking-frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Click the "Start Tracking" button to begin eye tracking
3. The interface will show:
   - Live video feed with eye tracking visualization
   - Gaze direction
   - Blink counter
   - Speaking detection
   - Head pose information
4. Click "Stop Tracking" to end the session

## Technical Details

### Backend
- Uses MediaPipe Face Mesh for facial landmark detection
- Flask server for handling HTTP requests and video streaming
- OpenCV for video capture and processing
- Custom algorithms for:
  - Gaze direction calculation
  - Blink detection
  - Speaking detection
  - Head pose estimation

### Frontend
- Built with React and Vite
- Styled with Tailwind CSS
- Real-time video streaming
- WebSocket communication for live updates
- Responsive design

## Troubleshooting

1. If the camera doesn't start:
   - Make sure no other application is using your webcam
   - Check if you have camera permissions enabled
   - Try restarting both servers

2. If you see no video feed:
   - Check if the backend server is running
   - Check your browser's console for errors
   - Try using Google Chrome

3. Common issues:
   - "No module named 'cv2'" - Run `pip install opencv-python`
   - "No module named 'mediapipe'" - Run `pip install mediapipe`
   - Port already in use - Change the port in camera_server.py

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on MediaPipe Face Mesh technology
- Inspired by various eye tracking research papers
- Frontend design inspired by modern web applications 