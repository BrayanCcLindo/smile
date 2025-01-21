import { useState, useRef } from "react";
import { Play } from "lucide-react";
import MainLinkButton from "./mainLinkButton";
import { ROUTES } from "../constants/routes";
import { useTranslation } from "react-i18next";

interface CustomVideoPlayerProps {
  src: string;
  coverImage: string;
}

export default function CustomVideoPlayer({
  src,
  coverImage
}: CustomVideoPlayerProps) {
  const { t } = useTranslation("global");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative mx-auto overflow-hidden w-full md:w-[350px] lg:w[500px] h-auto md:h-[700px] mb-4">
      <video
        ref={videoRef}
        src={src}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        controls={isPlaying}
        className="rounded-lg object-cover aspect-[9/16]"
        aria-label="Video player"
        poster={coverImage}
      >
        Tu navegador no soporta el elemento de video.
      </video>
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-center bg-cover cursor-pointer"
          onClick={handlePlayPause}
          role="button"
          aria-label="Reproducir video"
          tabIndex={0}
        >
          <div className="p-4 transition-transform transform bg-black bg-opacity-50 rounded-full hover:scale-110">
            <Play
              className="w-8 h-8 text-white md:w-12 md:h-12"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
      <div className="mt-4">
        <MainLinkButton link={ROUTES.CAMPANAS}>
          {t("cta.primary")}
        </MainLinkButton>
      </div>
    </div>
  );
}
