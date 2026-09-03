import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Celebratory Wedding Audio Player
 * Plays the custom uploaded wedding soundtrack (/igexport-DTiFPK1DyvH.mp3 / /music.mp3)
 * seamlessly in loop with first-gesture autoplay and floating controls.
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/igexport-DTiFPK1DyvH.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const playAudio = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy waiting for user click/tap
          });
      }
    };

    // Auto-start on first user interaction anywhere
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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
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
  );
}
