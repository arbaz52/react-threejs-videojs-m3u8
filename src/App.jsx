import { useEffect, useRef } from "react";
import { Player } from "./Player";
import videojs from "video.js";

export const App = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const player = new Player(ref.current);

    return () => {
      player.unmount();
    };
  });
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const vp = videojs(el, {});
    vp.play();
  });
  return (
    <>
      <div ref={ref} className="w-[100dvw] h-[100dvh] bg-gray-500 flex"></div>
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        className="absolute w-0 h-0 overflow-hidden"
      >
        <source src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" />
      </video>
    </>
  );
};
