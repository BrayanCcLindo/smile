import React, { useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  previewImageUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  previewImageUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video">
      <ReactPlayer
        url={videoUrl}
        light={previewImageUrl}
        playing={isPlaying}
        controls={true}
        width="100%"
        height="100%"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <button
          className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50"
          onClick={() => setIsPlaying(true)}
        >
          <svg
            className="w-16 h-16"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
