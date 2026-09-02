import { motion } from "motion/react";
const groomImg = "/images/portrait-groom.jpg";
const brideImg = "/images/portrait-bride.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function PortraitCard({
  src,
  alt,
  name,
  role,
  parents,
  text,
  flip,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
  parents?: string;
  text: string;
  flip?: boolean;
}) {
  return (
    <Reveal delay={flip ? 0.12 : 0} className="group">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="plate paper-grain overflow-hidden rounded-[2rem] border border-gold/40 shadow-xl"
      >
        <div className="relative overflow-hidden bg-[var(--cream)]">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover object-center"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 65%)",
            }}
          />
        </div>
        <div className="px-6 pt-6 pb-8 text-center">
          <p className="font-sans text-[0.62rem] tracking-[0.4em] text-gold-deep uppercase font-semibold">
            {role}
          </p>
          <h3 className="mt-2 text-2xl text-primary sm:text-3xl font-display">{name}</h3>
          {parents && (
            <p className="mt-1 font-script text-base text-primary/80 italic sm:text-lg">
              ({parents})
            </p>
          )}
          <div className="mx-auto my-3 h-px w-16 bg-gold/40" />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function CoupleStory() {
  const { story } = invitation;

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--blush) 26%, var(--ivory)) 50%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Chapter One" title={story.title} note={story.subtitle} />
        <Ornament className="mt-8" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {/* First Groom, then Bride as requested */}
          <PortraitCard
            src={groomImg}
            alt="Hand-painted caricature portrait of the groom Dr. Aditya Bansal"
            {...story.groom}
          />
          <PortraitCard
            src={brideImg}
            alt="Hand-painted caricature portrait of the bride Sakshi"
            flip
            {...story.bride}
          />
        </div>
      </div>
    </section>
  );
}

