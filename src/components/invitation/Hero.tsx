import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
const heroPalace = "https://media.invitestory.in/ever-after-bloom/src/assets/hero-palace.jpg";
const bougainvillea = "https://media.invitestory.in/ever-after-bloom/src/assets/bougainvillea.png";
const ganeshImg = "/images/ganesh-ji.jpg";
import { LanternField } from "./LanternField";
import { Petals } from "./Petals";
import { invitation } from "@/content/invitation";

/** Chapter one: the palace at dawn, with the sky as the stage and Lord Ganesha's blessings. */
export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 170]);
  const plateY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 70]);
  const titleY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollY, [0, 650], [1, 0]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pb-12 pt-8">
      {/* Painted sky + palace plate */}
      <motion.div className="absolute inset-0" style={{ y: skyY, scale: 1.08 }}>
        <img
          src={heroPalace}
          alt="Watercolour illustration of a sandstone palace beneath a blush dawn sky"
          width={1024}
          height={1536}
          className="h-full w-full object-cover object-bottom"
        />
      </motion.div>

      {/* Soft haze so type always reads */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 28%, transparent) 0%, transparent 30%, color-mix(in oklab, var(--cream) 24%, transparent) 75%, color-mix(in oklab, var(--ivory) 80%, transparent) 100%)",
        }}
      />

      <LanternField count={10} travel={1.1} />
      <Petals count={12} />

      {/* Drifting cloud veils */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-40 w-[160%] rounded-full blur-3xl"
            style={{
              top: `${10 + i * 16}%`,
              left: "-30%",
              background: `color-mix(in oklab, var(--ivory) ${34 - i * 10}%, transparent)`,
            }}
            animate={{ x: ["-8%", "18%", "-8%"] }}
            transition={{ duration: 52 + i * 22, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Birds */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            aria-hidden
            viewBox="0 0 24 8"
            className="pointer-events-none absolute w-4 text-primary/40 sm:w-5"
            style={{ top: `${22 + i * 5}%` }}
            animate={{ x: ["-10vw", "112vw"], y: [0, -14, 6, 0] }}
            transition={{
              duration: 34 + i * 9,
              delay: i * 7,
              repeat: Infinity,
              ease: "linear",
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path
              d="M1 5C4 1 7 1 10 5M14 5c3-4 6-4 9 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}

      {/* Corner botanicals */}
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -top-6 -left-16 w-48 opacity-90 sm:w-72 md:w-80"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, 1.6, -1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -right-20 bottom-20 w-44 scale-x-[-1] opacity-85 sm:w-64 md:w-72"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, -1.4, 1, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-between px-5 pt-8 pb-6 text-center"
        style={{ y: titleY, opacity: fade }}
      >
        {/* Lord Ganesha Motif & Shloka Section */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          {/* Ornate Ganesh Ji frame */}
          <div className="relative mb-2.5 h-20 w-20 overflow-hidden rounded-full border-2 border-gold/60 p-1 shadow-[0_4px_20px_rgba(212,175,55,0.35)] backdrop-blur-sm sm:h-24 sm:w-24">
            <div className="h-full w-full overflow-hidden rounded-full bg-[var(--cream)]">
              <img
                src={ganeshImg}
                alt="Lord Ganesha - Auspicious Blessing"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-gold/40 animate-pulse"
            />
          </div>

          <h3 className="font-display text-lg tracking-wider text-gold-deep sm:text-xl font-semibold">
            {invitation.ganesh.heading}
          </h3>
          <p className="mt-1 font-script text-xs sm:text-sm text-primary/85 leading-relaxed italic max-w-sm">
            {invitation.ganesh.mantra}
          </p>
        </motion.div>

        {/* Central Couple Typography */}
        <div className="my-auto py-6 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="font-sans text-[0.62rem] tracking-[0.45em] text-primary/75 uppercase sm:text-xs"
          >
            {invitation.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-4xl leading-[1.05] text-primary drop-shadow-[0_2px_16px_rgba(255,255,255,0.7)] sm:text-6xl md:text-7xl"
          >
            {invitation.couple.groomShort}
            <span className="mx-3 font-script text-3xl italic sm:text-4xl text-gold-deep">&amp;</span>
            <br className="sm:hidden" />
            {invitation.couple.brideShort}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-4 h-px w-36 origin-center sm:w-52"
            style={{ background: "var(--gradient-gold)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.95 }}
            className="mt-3 font-script text-lg text-primary/80 italic sm:text-2xl"
          >
            {invitation.hero.blessing}
          </motion.p>

          {/* Quick Date & Venue pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[0.7rem] sm:text-xs text-primary/85 font-sans"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 backdrop-blur-sm border border-gold/20">
              <Calendar size={13} className="text-gold-deep" />
              {invitation.dateLabel}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 backdrop-blur-sm border border-gold/20">
              <MapPin size={13} className="text-gold-deep" />
              {invitation.venue.name}, Patiala
            </span>
          </motion.div>

          {/* Save the Date CTA Button */}
          <motion.a
            href="#details"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="glass-plate shimmer mt-6 rounded-full px-8 py-3 font-sans text-[0.68rem] tracking-[0.3em] uppercase shadow-md"
          >
            <span className="gold-text shimmer font-semibold">{invitation.hero.eyebrow}</span>
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-2 text-primary/50"
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}

