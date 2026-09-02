import { createFileRoute } from "@tanstack/react-router";
import { IntroGate } from "@/components/invitation/IntroGate";
import { Hero } from "@/components/invitation/Hero";
import { CoupleStory } from "@/components/invitation/CoupleStory";
import { Countdown } from "@/components/invitation/Countdown";
import { Details } from "@/components/invitation/Details";
import { Timeline } from "@/components/invitation/Timeline";
import { Gallery } from "@/components/invitation/Gallery";
import { Footer } from "@/components/invitation/Footer";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { invitation } from "@/content/invitation";

const title = `${invitation.couple.groom} & ${invitation.couple.bride} — Wedding Invitation`;
const description = `Celebrate the wedding of ${invitation.couple.groom} and ${invitation.couple.bride} on ${invitation.dateLabel} at ${invitation.venue.name}, Patiala. A hand-painted, animated wedding storybook.`;

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, couple, dateLabel } = invitation;
    const siteUrl = meta.siteUrl;
    const ogImageUrl = `${siteUrl}${meta.ogImage}`;
    const pageTitle = meta.ogTitle;
    const pageDescription = meta.ogDescription;

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:image", content: ogImageUrl },
        { property: "og:image:secure_url", content: ogImageUrl },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${couple.title} Wedding Celebration — ${dateLabel}` },
        { property: "og:site_name", content: `${couple.title} Wedding Storybook` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: siteUrl },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: pageDescription },
        { name: "twitter:image", content: ogImageUrl },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <IntroGate />
      <MusicPlayer />
      <Hero />
      <CoupleStory />
      <Countdown />
      <Details />
      <Timeline />
      <Gallery />
      <Footer />
    </main>
  );
}


