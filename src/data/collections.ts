import salvationImg from "@/assets/salvation-thumbnail.png";

export interface Collection {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  presentationIds: string[];
  duration: string;
  createdAt: string;
  category: 'seminar' | 'bible-study';
}

export const collections: Collection[] = [
  {
    id: "winter-seminar-2026",
    title: "Зимний семинар 2026 — Бог правит",
    titleEn: "Winter Seminar 2026 — God Reigns",
    description: "Четыре темы о Божьем владычестве: от существования Бога через вечность и зло к драме искупления",
    descriptionEn: "Four topics on God's sovereignty: from God's existence through eternity and evil to the drama of redemption",
    thumbnail: salvationImg,
    presentationIds: ["god-exists", "eternal-temporal", "seminar", "salvation"],
    duration: "120",
    createdAt: "01.02.2026",
    category: 'seminar',
  },
];
