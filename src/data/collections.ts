import salvationImg from "@/assets/salvation-thumbnail.png";
import summerSeminarImg from "@/assets/summer-seminar-thumbnail.png";

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
    id: "winter-seminar-2025",
    title: "Зимний семинар 2025 — Бог правит",
    titleEn: "Winter Seminar 2025 — God Reigns",
    description: "Четыре темы о Божьем владычестве: от существования Бога через вечность и зло к драме искупления",
    descriptionEn: "Four topics on God's sovereignty: from God's existence through eternity and evil to the drama of redemption",
    thumbnail: salvationImg,
    presentationIds: ["god-exists", "eternal-temporal", "seminar", "salvation"],
    duration: "120",
    createdAt: "22.12.2025",
    category: 'seminar',
  },
  {
    id: "summer-seminar-2026",
    title: "Летний семинар 2026 — Бог должен быть принят верой",
    titleEn: "Summer Seminar 2026 — God Must Be Accepted by Faith",
    description: "Три темы о вере: от тонкой настройки Вселенной через осознание греха к славе спасения во Христе",
    descriptionEn: "Three topics on faith: from fine-tuning of the Universe through awareness of sin to the glory of salvation in Christ",
    thumbnail: summerSeminarImg,
    presentationIds: ["creation", "fine-tuned-universe", "sin", "salvation-way"],
    duration: "90",
    createdAt: "28.02.2026",
    category: 'seminar',
  },
];
