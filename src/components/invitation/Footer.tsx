import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
const sunset = "https://media.invitestory.in/ever-after-bloom/src/assets/sunset-sky.jpg";
const lanternImg = "https://media.invitestory.in/ever-after-bloom/src/assets/lantern.png";
import { invitation } from "@/content/invitation";
import { LanternField } from "./LanternField";
import { Ornament, Reveal } from "./Reveal";

const blessings = [
  "May your evenings always be unhurried.",
  "May laughter and joy fill your beautiful home.",
  "May you keep choosing each other, every single day.",
  "May Lord Ganesha always guide your path with grace.",
  "May your bond grow stronger with each passing year.",
];

/** A soft aurora wash — pure CSS, no canvas, cheap on mobile. */
function AuroraGlow() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[70%] w-[70%] rounded-full blur-[90px]"
          style={{
            left: `${i * 26 - 10}%`,
            top: `${8 + i * 12}%`,
            background: [
              "color-mix(in oklab, var(--lavender) 55%, transparent)",
              "color-mix(in oklab, var(--peach) 50%, transparent)",
              "color-mix(in oklab, var(--skyblue) 48%, transparent)",
            ][i],
            mixBlendMode: "screen",
            opacity: 0.55,
          }}
          animate={reduced ? {} : { x: [0, 40, -30, 0], y: [0, -26, 18, 0] }}
          transition={{ duration: 30 + i * 11, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const [released, setReleased] = useState<{ id: number; text: string; left: number }[]>([]);

  const release = () => {
    const id = Date.now();
    setReleased((prev) => [
      ...prev,
      {
        id,
        text: blessings[Math.floor(Math.random() * blessings.length)]!,
        left: 18 + Math.random() * 64,
      },
    ]);
    setTimeout(() => setReleased((prev) => prev.filter((r) => r.id !== id)), 7000);
  };

  const { familyRoster } = invitation;

  return (
    <footer className="relative overflow-hidden pt-20 pb-16">
      <img
        src={sunset}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 45%, transparent) 26%, color-mix(in oklab, var(--lavender) 30%, transparent) 100%)",
        }}
      />
      <AuroraGlow />
      <LanternField count={7} travel={1.05} className="opacity-90" />

      {/* Released wish lanterns */}
      <AnimatePresence>
        {released.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none absolute bottom-10 z-10 flex w-44 flex-col items-center text-center"
            style={{ left: `${r.left}%` }}
            initial={{ y: 0, opacity: 0, scale: 0.7 }}
            animate={{ y: -520, opacity: [0, 1, 1, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: "easeOut" }}
          >
            <img
              src={lanternImg}
              alt=""
              width={580}
              height={751}
              className="w-10 drop-shadow-[0_0_18px_color-mix(in_oklab,var(--gold)_65%,transparent)]"
            />
            <span className="mt-2 font-script text-sm text-primary italic font-semibold">{r.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-20 mx-auto max-w-3xl px-5">
        {/* Bansal Family Tribute Card */}
        <Reveal delay={0.05}>
          <div className="plate paper-grain rounded-[2.2rem] p-7 sm:p-10 text-center border-2 border-gold/50 shadow-2xl backdrop-blur-md">
            <Ornament />
            
            <p className="mt-6 font-script text-2xl sm:text-3xl text-primary italic">
              "{familyRoster.heading}"
            </p>

            <div className="my-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/50 sm:w-20" />
              <h3 className="font-sans text-[0.72rem] sm:text-xs font-bold tracking-[0.38em] text-gold-deep uppercase">
                {familyRoster.subheading}
              </h3>
              <span className="h-px w-12 bg-gold/50 sm:w-20" />
            </div>

            {/* Family Members */}
            <div className="mt-6 space-y-2.5">
              {familyRoster.members.map((member) => (
                <div
                  key={member}
                  className="rounded-xl bg-white/50 py-2.5 px-4 font-display text-sm sm:text-base font-medium text-primary border border-gold/20 backdrop-blur-xs tracking-wide"
                >
                  {member}
                </div>
              ))}
            </div>

            {/* Youth / Doctors */}
            <div className="mt-6 pt-5 border-t border-gold/25">
              <p className="font-sans text-[0.62rem] tracking-[0.3em] text-gold-deep uppercase font-semibold mb-2">
                With Love & Warm Regards
              </p>
              <p className="font-display text-sm sm:text-base font-semibold text-primary tracking-wider">
                {familyRoster.youth}
              </p>
            </div>

            {/* Children */}
            <div className="mt-5 pt-4 border-t border-gold/20">
              <p className="font-sans text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase font-semibold mb-2">
                Little Blessings
              </p>
              <p className="font-display text-sm sm:text-base font-medium text-primary/90 tracking-wide">
                {familyRoster.kids}
              </p>
            </div>

            {/* RSVP */}
            <div className="mt-7 pt-6 border-t-2 border-gold/40">
              <h4 className="font-sans text-sm font-bold tracking-[0.4em] text-gold-deep uppercase mb-3">
                RSVP
              </h4>
              <div className="space-y-1.5 font-display text-sm sm:text-base font-semibold text-primary tracking-wide">
                {familyRoster.rsvp.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Wish Lantern & Signoff */}
        <div className="mt-14 text-center">
          <h2 className="font-script text-3xl leading-snug text-primary italic sm:text-4xl">
            {invitation.footer.line1}
            <br />
            {invitation.footer.line2}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <motion.button
              type="button"
              onClick={release}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-plate inline-flex items-center gap-2 rounded-full px-7 py-3 font-sans text-[0.65rem] tracking-[0.28em] text-primary uppercase shadow-md hover:border-gold"
            >
              <Sparkles size={14} className="text-gold-deep" /> Release a wish lantern
            </motion.button>
          </div>

          <p className="mt-10 font-display text-xl text-primary font-semibold">{invitation.footer.signoff}</p>
          <p className="mt-2 font-sans text-[0.62rem] tracking-[0.34em] text-primary/70 uppercase">
            {invitation.dateLabel} · {invitation.venue.name}, Patiala
          </p>

          <p className="mt-10 inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.3em] text-primary/55 uppercase">
            Made with <Heart size={11} className="fill-rose text-rose" /> for our cherished guests
          </p>
        </div>
      </div>
    </footer>
  );
}

