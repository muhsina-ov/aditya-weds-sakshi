import { motion } from "motion/react";
import { CalendarPlus, Clock, MapPin, Sparkles, Utensils, Music, PartyPopper } from "lucide-react";
const mapPlate = "https://media.invitestory.in/ever-after-bloom/src/assets/map-plate.jpg";
const car = "https://media.invitestory.in/ever-after-bloom/src/assets/wedding-car.png";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function buildIcs() {
  const start = new Date(invitation.dateISO);
  const end = new Date(start.getTime() + 8 * 3_600_000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Storybook//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@wedding`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${invitation.couple.groom} & ${invitation.couple.bride} — Wedding Ceremony`,
    `LOCATION:${invitation.venue.name}, ${invitation.venue.address}`,
    "DESCRIPTION:Barat at 10:00 AM, Lunch at 1:00 PM, Dance & Celebrations at 3:30 PM. We would be honoured to have you with us.",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function Details() {
  const maps = invitation.venue.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    invitation.venue.mapsQuery,
  )}`;

  return (
    <section id="details" className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--peach) 26%, var(--ivory)) 0%, var(--cream) 45%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Two" title="The Sacred Celebrations" note="Where our stories gather in joy and blessings" />
        <Ornament className="mt-8" />

        {/* Venue & Date Summary Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal delay={0}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="plate paper-grain h-full rounded-[1.6rem] px-6 py-7 border border-gold/40 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/20 p-2.5 text-gold-deep">
                  <Sparkles size={20} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-sans text-[0.6rem] tracking-[0.36em] text-gold-deep uppercase font-semibold">
                    The Auspicious Day
                  </p>
                  <p className="mt-1 font-display text-xl leading-snug text-primary">{invitation.dateLabel}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="plate paper-grain h-full rounded-[1.6rem] px-6 py-7 border border-gold/40 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/20 p-2.5 text-gold-deep">
                  <MapPin size={20} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-sans text-[0.6rem] tracking-[0.36em] text-gold-deep uppercase font-semibold">
                    The Venue
                  </p>
                  <p className="mt-1 font-display text-xl leading-snug text-primary">{invitation.venue.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{invitation.venue.address}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Wedding Timings & Program Schedule */}
        <Reveal delay={0.12} className="mt-8">
          <div className="plate paper-grain rounded-[2rem] p-6 sm:p-8 border border-gold/40 shadow-lg">
            <div className="text-center mb-6">
              <span className="font-sans text-[0.62rem] tracking-[0.38em] text-gold-deep uppercase font-semibold">
                Event Itinerary & Timings
              </span>
              <h3 className="mt-1 text-2xl font-display text-primary">Order of Celebrations</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {invitation.events.map((event, idx) => (
                <motion.div
                  key={event.title}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white/60 p-5 text-center border border-gold/25 backdrop-blur-sm shadow-sm"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-gold-deep mb-3">
                    {idx === 0 && <Music size={20} />}
                    {idx === 1 && <Utensils size={20} />}
                    {idx === 2 && <PartyPopper size={20} />}
                  </div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 font-sans text-[0.65rem] font-bold text-primary tracking-wider">
                    {event.time}
                  </span>
                  <h4 className="mt-2 text-xl font-display text-primary font-semibold">{event.title}</h4>
                  <p className="mt-1.5 font-sans text-xs text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Action Buttons: Calendar & Map */}
        <Reveal delay={0.16} className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.a
            href={buildIcs()}
            download="aditya-sakshi-wedding.ics"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-sans text-[0.68rem] tracking-[0.24em] text-primary-foreground uppercase shadow-md transition-all hover:bg-primary/90"
          >
            <CalendarPlus size={16} strokeWidth={1.8} /> Add to Calendar
          </motion.a>
          <motion.a
            href={maps}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="glass-plate inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-[0.68rem] tracking-[0.24em] text-primary uppercase shadow-md hover:border-gold"
          >
            <MapPin size={16} strokeWidth={1.8} /> Get Directions (Google Maps)
          </motion.a>
        </Reveal>

        {/* Illustrated map plate with the wedding car rolling in */}
        <Reveal delay={0.2} className="mt-12">
          <div className="plate relative overflow-hidden rounded-[2rem] border border-gold/30">
            <img
              src={mapPlate}
              alt="Hand-painted illustrated map of Patiala with The Grand JD marked"
              loading="lazy"
              width={1280}
              height={1024}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, color-mix(in oklab, var(--cream) 60%, transparent), transparent 55%)",
              }}
            />
            <div className="absolute top-4 left-4 rounded-xl bg-white/80 px-4 py-2 backdrop-blur-md border border-gold/40 shadow-md">
              <p className="font-display text-sm font-semibold text-primary">📍 The Grand JD</p>
              <p className="font-sans text-[0.68rem] text-muted-foreground">Nabha Road, Patiala, Punjab</p>
            </div>
            <motion.img
              src={car}
              alt=""
              aria-hidden
              loading="lazy"
              width={1175}
              height={567}
              className="absolute bottom-2 left-0 w-40 sm:w-56"
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 24, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

