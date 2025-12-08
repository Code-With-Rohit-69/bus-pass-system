"use client";

import Card from "@/components/common/card";
import { MapPin, NotepadText, ShieldCheck } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const cardsData = [
  {
    id: uuidv4(),
    icon: <NotepadText size={40} className="text-(--color-primary)" />,
    title: "Quick Online Application",
    description:
      "Apply for your bus pass in minutes, with our simple online form.",
  },
  {
    id: uuidv4(),
    icon: <ShieldCheck size={40} className="text-(--color-primary)" />,
    title: "Secure Digital Pass",
    description: "Get a digital bus pass with secure account access.",
  },
  {
    id: uuidv4(),
    icon: <MapPin size={40} className="text-(--color-primary)" />,
    title: "City-Wide Transport Access",
    description:
      "Use your pass across the city on all public transport networks.",
  },
];

export const Cards = () => {
  return (
    <div className="flex items-center justify-between px-20 mt-10">
      {cardsData.map((card, index) => (
        <Card
          icon={card.icon}
          key={card.id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};
