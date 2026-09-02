/**
 * All copy and structured data for the wedding invitation of Dr. Aditya Bansal & Sakshi.
 */

export const invitation = {
  meta: {
    siteUrl: "https://aditya-weds-sakshi.pages.dev",
    ogImage: "/og-image.jpg",
    ogTitle: "Dr. Aditya & Sakshi — Royal Wedding Invitation",
    ogDescription: "Together with our families, we joyfully invite you to celebrate the wedding of Dr. Aditya Bansal & Sakshi on Saturday, 19 September 2026 at The Grand JD, Patiala.",
  },
  couple: {
    groom: "Dr. Aditya Bansal",
    groomShort: "Dr. Aditya",
    groomParents: "S/o Sh. Ravinder Kumar Bansal & Smt. Anju Bansal",
    bride: "Sakshi",
    brideShort: "Sakshi",
    brideParents: "D/o Sh. Vinod Mahajan & Smt. Rajni Aggarwal",
    initials: "A & S",
    title: "Dr. Aditya & Sakshi",
  },
  /** ISO date-time of the ceremony (19 Sept 2026 10:00 AM IST) */
  dateISO: "2026-09-19T10:00:00+05:30",
  dateLabel: "Saturday, 19 September 2026",
  dateShort: "19.09.2026",
  timeLabel: "Starting at 10:00 AM",
  venue: {
    name: "The Grand JD",
    address: "Nabha Rd, Patiala, Punjab",
    mapsQuery: "The Grand JD Nabha Rd Patiala Punjab",
    mapsUrl: "https://maps.app.goo.gl/M6WNKjMhVdMJnPWz9",
  },
  ganesh: {
    heading: "॥ श्री गणेशाय नमः ॥",
    mantra: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    translation: "May Lord Ganesha remove all obstacles and grace this union with eternal love, harmony, and prosperity.",
  },
  hero: {
    kicker: "Together with our families",
    eyebrow: "Save the Date",
    blessing: "Two souls, one sacred beginning",
  },
  story: {
    title: "The Auspicious Union",
    subtitle: "A journey of two souls blessed by love and tradition",
    groom: {
      name: "Dr. Aditya Bansal",
      role: "The Groom",
      parents: "S/o Sh. Ravinder Kumar Bansal & Smt. Anju Bansal",
      text: "A compassionate doctor with a warm heart and gentle smile. Ready to embark on life's most beautiful chapter with elegance, joy, and devotion.",
    },
    bride: {
      name: "Sakshi",
      role: "The Bride",
      parents: "D/o Sh. Vinod Mahajan & Smt. Rajni Aggarwal",
      text: "Radiant, graceful, and full of warmth. With a heart that brings joy wherever she goes, stepping into a new world of togetherness.",
    },
  },
  events: [
    {
      title: "Barat",
      time: "10:00 AM",
      icon: "music",
      description: "Arrival of the celebratory wedding procession with pomp and joy.",
    },
    {
      title: "Lunch",
      time: "1:00 PM",
      icon: "utensils",
      description: "A royal feast of celebratory delicacies.",
    },
    {
      title: "Dance & Celebration",
      time: "3:30 PM",
      icon: "sparkles",
      description: "Music, dance, laughter, and unforgettable moments.",
    },
  ],
  chapters: [
    {
      no: "I",
      title: "The Auspicious Beginning",
      when: "The Sacred Match",
      text: "Two families united in shared values and joy, blessing two beautiful individuals to walk together on life's greatest adventure.",
    },
    {
      no: "II",
      title: "Words & Warmth",
      when: "Memories in the Making",
      text: "Countless conversations, shared smiles, and the gentle realization that home is wherever they are together.",
    },
    {
      no: "III",
      title: "The Celebration",
      when: "19 September 2026",
      text: "Beneath the royal arches of Patiala, surrounded by the warmth and blessings of our cherished family and friends.",
    },
    {
      no: "IV",
      title: "And Now, You",
      when: "With Your Blessings",
      text: "Our joyous milestone is incomplete without your presence, warm wishes, and heartfelt blessings.",
    },
  ],
  familyRoster: {
    heading: "We can't wait to celebrate with you",
    subheading: "WITH LOVE, THE BANSAL FAMILY",
    elders: "Late Sh. Brij Lal Bansal — Late Smt. Shimla Devi",
    couples: [
      "Mohinder Paul Bansal — Veena Bansal",
      "Dr. Rajinder Bansal — Dr. Shubnam Bansal",
      "Ravinder Kumar Bansal — Anju Bansal",
      "Dr. Tulesh Bansal — Dr. Sakshi Bansal",
      "Dr. Manisha Singla — Dr. Mukesh Singla",
    ],
    youth: [
      "Dr. Uday Bansal",
      "Dr. Vasu Bansal",
      "Dr. Vibhu Bansal",
    ],
    kids: [
      "Manthan Singla",
      "Sanaya Bansal",
      "Kavya Singla",
      "Anaya Bansal",
    ],
  },
  footer: {
    line1: "Come early. Stay late.",
    line2: "Celebrate and dance with us.",
    signoff: "With all our love, Dr. Aditya & Sakshi",
  },
} as const;
