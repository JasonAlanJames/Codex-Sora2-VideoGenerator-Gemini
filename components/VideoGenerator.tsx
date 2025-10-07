import React, { useState } from 'react';
import { Wand2, Download } from 'lucide-react';
import { generateVideo } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const VideoGenerator: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    if (!user) {
      setError('You must be logged in to generate a video.');
      return;
    }
    setIsLoading(true);
    setVideoUrl(null);
    setError(null);
    setProgressMessage('Initializing video generation...');

    try {
      const url = await generateVideo(prompt, setProgressMessage);
      setVideoUrl(url);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setIsLoading(false);
      setProgressMessage('');
    }
  };
  
  return (
    <div className="w-full max-w-2xl bg-dark-800 p-6 sm:p-8 rounded-xl shadow-2xl relative">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Create Your Viral Video</h2>
        <p className="text-center text-gray-400 mb-6">Describe your idea, and let our AI bring it to life.</p>
        
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A cat DJing a party in space'"
            className="w-full h-28 p-4 bg-dark-700 border-2 border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition resize-none disabled:opacity-50"
            disabled={isLoading}
            aria-label="Video prompt"
          />
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-brand-primary disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <><LoadingSpinner size={5} /><span className="ml-2">Generating...</span></>
            ) : (
              <><Wand2 className="mr-2 h-5 w-5" />Generate Video</>
            )}
          </button>
        </div>
        
        <div className="mt-8">
          {isLoading && (
            <div className="text-center p-4 bg-dark-700 rounded-lg">
                <p className="text-brand-secondary font-semibold animate-pulse">{progressMessage}</p>
                <p className="text-xs text-gray-400 mt-2">Video generation can take several minutes. Please stay on this page.</p>
            </div>
          )}
          {error && (
            <div className="text-center p-4 bg-red-900 border border-red-700 text-red-300 rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
          )}
          {videoUrl && (
            <div className="space-y-4 animate-fade-in-up">
                <h3 className="text-xl font-semibold text-center text-white">Your Video is Ready!</h3>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
              </div>
              <div className="grid grid-cols-1">
                <a
                  href={videoUrl}
                  download={`ai-video-${Date.now()}.mp4`}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-dark-900 bg-gray-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-white transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Video
                </a>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default VideoGenerator;