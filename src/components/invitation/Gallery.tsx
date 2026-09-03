import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, Sparkles, Heart } from "lucide-react";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const seatedImg = "/img4.jpeg";
const danceWideImg = "/img2.jpeg";
const danceCloseImg = "/img3.jpeg";
const ringsImg = "/img1.jpeg";

const galleryPlates = [
  {
    src: seatedImg,
    title: "Auspicious Beginnings",
    subtitle: "Seated in grace & togetherness",
    span: "sm:col-span-1 sm:row-span-2",
    ratio: "aspect-[3/4]",
  },
  {
    src: danceCloseImg,
    title: "Eyes & Smiles",
    subtitle: "A beautiful lifetime in a glance",
    span: "sm:col-span-1",
    ratio: "aspect-[4/3]",
  },
  {
    src: ringsImg,
    title: "Sacred Promise",
    subtitle: "Two hands, one eternal bond",
    span: "sm:col-span-1",
    ratio: "aspect-[4/3]",
  },
  {
    src: danceWideImg,
    title: "The Celebration Dance",
    subtitle: "Joyful moments with family & loved ones",
    span: "sm:col-span-2",
    ratio: "aspect-[16/9]",
  },
];

export function Gallery() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--blush) 26%, var(--ivory)) 50%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Chapter Four" title="Cherished Moments" note="Glimpses of love, laughter & forever" />
        <Ornament className="mt-8" />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {galleryPlates.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.span}>
              <motion.button
                type="button"
                onClick={() => setOpen(i)}
                whileHover={{ y: -6 }}
                animate={reduced ? {} : { y: [0, -3, 0] }}
                transition={{
                  y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                }}
                className="plate paper-grain group block h-full w-full overflow-hidden rounded-[2rem] p-3 text-left border border-gold/40 shadow-xl cursor-pointer"
              >
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-[var(--cream)]">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className={`${p.ratio} h-full w-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]`}
                  />
                  
                  {/* Subtle golden ambient vignette */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"
                  />

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="font-display text-lg sm:text-xl font-semibold text-white drop-shadow-md">
                      {p.title}
                    </p>
                    <p className="mt-0.5 font-script text-sm sm:text-base text-gold-light italic drop-shadow-sm">
                      {p.subtitle}
                    </p>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-[1.8rem] border-2 border-gold/40 shadow-2xl bg-black/40">
              <motion.img
                src={galleryPlates[open]!.src}
                alt={galleryPlates[open]!.title}
                className="max-h-[75vh] w-auto object-contain mx-auto rounded-[1.4rem]"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="p-4 text-center bg-black/60 backdrop-blur-sm">
                <p className="font-display text-lg text-white font-semibold">{galleryPlates[open]!.title}</p>
                <p className="font-script text-sm text-gold-light italic">{galleryPlates[open]!.subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close"
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110"
              onClick={() => setOpen(null)}
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
