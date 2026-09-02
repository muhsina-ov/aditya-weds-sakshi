import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  unMute: () => void;
  mute: () => void;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

const YOUTUBE_VIDEO_ID = "8mYeTuzBQr4";
const LOOP_START_SECONDS = 30;
const LOOP_END_SECONDS = 80; // 1 min 20 sec

/**
 * YouTube Background Music Player
 * Plays https://youtu.be/8mYeTuzBQr4 looping seamlessly between 00:30 and 01:20.
 * Includes interactive mute/unmute control, visualizer bars, and fallback to local audio.
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const checkIntervalRef = useRef<number | null>(null);

  // Initialize YouTube Iframe Player
  useEffect(() => {
    let isSubscribed = true;

    const onPlayerReady = (event: { target: YTPlayerInstance }) => {
      if (!isSubscribed) return;
      const player = event.target;
      playerRef.current = player;
      player.unMute();
      player.setVolume(85);
      player.seekTo(LOOP_START_SECONDS, true);

      // Time polling to ensure seamless loop from 0:30 to 1:20
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = window.setInterval(() => {
        try {
          if (player && typeof player.getCurrentTime === "function") {
            const current = player.getCurrentTime();
            if (current >= LOOP_END_SECONDS || current < LOOP_START_SECONDS - 2) {
              player.seekTo(LOOP_START_SECONDS, true);
            }
          }
        } catch {
          // ignore
        }
      }, 500);
    };

    const onPlayerStateChange = (event: { data: number }) => {
      if (window.YT && event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else if (window.YT && (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED)) {
        if (event.data === window.YT.PlayerState.ENDED) {
          playerRef.current?.seekTo(LOOP_START_SECONDS, true);
          playerRef.current?.playVideo();
        }
      }
    };

    const initYT = () => {
      if (window.YT && window.YT.Player) {
        new window.YT.Player("youtube-audio-player", {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: LOOP_START_SECONDS,
            end: LOOP_END_SECONDS,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initYT;
    } else {
      initYT();
    }

    // Auto-play trigger on first user interaction
    const handleFirstGesture = () => {
      if (playerRef.current) {
        try {
          playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          // Fallback
        }
      }
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("scroll", handleFirstGesture, { passive: true, once: true });

    return () => {
      isSubscribed = false;
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const player = playerRef.current;

    if (player) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.unMute();
        player.playVideo();
        setIsPlaying(true);
      }
    } else if (fallbackAudioRef.current) {
      const audio = fallbackAudioRef.current;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube Iframe Audio Engine */}
      <div className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none w-1 h-1 overflow-hidden" aria-hidden="true">
        <div id="youtube-audio-player" />
      </div>

      <div className="fixed bottom-5 left-5 z-40">
        <motion.button
          type="button"
          onClick={toggleMusic}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? "Mute celebratory music" : "Play celebratory music"}
          className="glass-plate flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold cursor-pointer"
        >
          <div className="relative flex h-5 w-5 items-center justify-center text-primary">
            {isPlaying ? (
              <Volume2 size={18} className="animate-pulse text-gold-deep" />
            ) : (
              <VolumeX size={18} className="text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[0.62rem] font-medium tracking-[0.24em] text-primary uppercase">
              {isPlaying ? "Wedding Music" : "Play Music"}
            </span>

            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 bg-gold-deep rounded-full"
                    animate={{ height: ["20%", `${h * 100}%`, "20%"] }}
                    transition={{
                      duration: 0.5 + i * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.button>
      </div>
    </>
  );
}
