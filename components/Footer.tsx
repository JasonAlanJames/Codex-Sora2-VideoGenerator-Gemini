
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} AI Social Media Video Generator. All rights reserved.
        </p>
        <p className="text-sm mt-1">
          A project by{' '}
          <a
            href="https://usefulaihacks.com/ai-social-media-video-generator/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:underline"
          >
            Useful AI Hacks
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
