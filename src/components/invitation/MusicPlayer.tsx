import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Music } from "lucide-react";

/**
 * Celebratory Indian Wedding Audio Player
 * Plays high-quality traditional Shehnai & Sitar melody (/music.mp3)
 * with graceful autoplay upon opening envelope or tapping anywhere,
 * plus interactive visualizer bars and floating mute/unmute control.
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const playAudio = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser autoplay restrictions until user interaction
          });
      }
    };

    // Auto-start music on first user gesture (touch or click)
    const handleFirstGesture = () => {
      playAudio();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("scroll", handleFirstGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
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
            {isPlaying ? "Shehnai & Sitar" : "Play Music"}
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
  );
}
