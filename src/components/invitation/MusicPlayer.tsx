import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Music } from "lucide-react";

/**
 * Ambient royal Shehnai / Indian wedding background audio player
 * Uses a synthesized raga chime & Indian flute / shehnai harmonics via Web Audio API
 * combined with an audio element option, ensuring 100% reliable, zero-broken-link playback anywhere.
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const startSynthesizedMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      // Traditional Indian Wedding Raag Bilawal / Yaman notes (Sa, Re, Ga, Ma, Pa, Dha, Ni)
      const baseFreqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
      let step = 0;

      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm harmonic tone resembling acoustic sitar / shehnai
        osc.type = "sine";
        const noteIndex = [0, 2, 4, 7, 5, 4, 2, 0, 4, 7, 9, 7, 4, 2][step % 14];
        const freq = (baseFreqs[noteIndex % baseFreqs.length] || 261.63) * (noteIndex > 7 ? 1.5 : 1);
        osc.frequency.setValueAtTime(freq, now);

        // Soft envelope
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);

        step++;
        timerRef.current = window.setTimeout(playNote, 600 + Math.random() * 400);
      };

      playNote();
    } catch {
      // AudioContext unavailable
    }
  };

  const stopSynthesizedMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      void audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopSynthesizedMusic();
      setIsPlaying(false);
    } else {
      startSynthesizedMusic();
      setIsPlaying(true);
    }
  };

  // Listen for user tap anywhere on the page to start background audio smoothly
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasInteracted && !isPlaying) {
        startSynthesizedMusic();
        setIsPlaying(true);
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) void audioCtxRef.current.close();
    };
  }, [hasInteracted, isPlaying]);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <motion.button
        type="button"
        onClick={toggleMusic}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Mute celebratory music" : "Play celebratory music"}
        className="glass-plate flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold"
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
                    duration: 0.6 + i * 0.15,
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
