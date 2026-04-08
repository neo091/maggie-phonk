import React from "react";

interface VideoThumbnailProps {
  videoId: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function VideoThumbnail({
  videoId,
  alt = "Video thumbnail",
  className = "w-40",
  children,
}: VideoThumbnailProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <img
        className="w-full rounded"
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={alt}
      />
      {children}
    </div>
  );
}
