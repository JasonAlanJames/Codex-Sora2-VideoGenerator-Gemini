import React from 'react';
import { useAuth } from '../hooks/useAuth';
import VideoGenerator from './VideoGenerator';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="w-full flex flex-col items-center space-y-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Welcome, {user?.displayName || 'Creator'}!</h2>
                <p className="text-gray-400">Let's make something amazing today.</p>
            </div>
            
            <VideoGenerator />

        </div>
    );
};

export default Dashboard;