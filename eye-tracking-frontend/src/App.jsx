import { useState, useEffect, useRef } from 'react';

function App() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ totalBlinks: 0 });
  const videoRef = useRef(null);

  useEffect(() => {
    let statusInterval;
    if (isStreaming) {
      statusInterval = setInterval(async () => {
        try {
          const response = await fetch('http://localhost:5000/status');
          const data = await response.json();
          setStatus(data);
        } catch (error) {
          console.error('Error fetching status:', error);
        }
      }, 1000);
    }
    return () => {
      if (statusInterval) clearInterval(statusInterval);
    };
  }, [isStreaming]);

  const startTracking = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/start', {
        method: 'POST',
      });
      
      if (response.ok) {
        setIsStreaming(true);
        // Force reload the video feed
        if (videoRef.current) {
          videoRef.current.src = `http://localhost:5000/video_feed?t=${Date.now()}`;
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to start tracking');
      }
    } catch (error) {
      setError('Failed to connect to backend. Make sure the Python server is running.');
      console.error('Error:', error);
    }
  };

  const stopTracking = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/stop', {
        method: 'POST',
      });
      
      if (response.ok) {
        setIsStreaming(false);
        if (videoRef.current) {
          videoRef.current.src = '';
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to stop tracking');
      }
    } catch (error) {
      setError('Failed to connect to backend');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Eye Tracking System</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
            {isStreaming ? (
              <img
                ref={videoRef}
                src={`http://localhost:5000/video_feed?t=${Date.now()}`}
                alt="Video feed"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Video feed error:', e);
                  setError('Failed to load video feed');
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">Click Start to begin eye tracking</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={isStreaming ? stopTracking : startTracking}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                isStreaming
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isStreaming ? 'Stop Tracking' : 'Start Tracking'}
            </button>
          </div>

          {isStreaming && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">Statistics</h2>
                <p className="text-gray-300">Total Blinks: {status.totalBlinks}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">Status</h2>
                <p className="text-green-400">Camera Active</p>
                <p className="text-green-400">Tracking Running</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 