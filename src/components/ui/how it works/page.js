"use client";
import Card from "@/components/common/card";
import { v4 as uuidv4 } from "uuid";
import { MousePointerClick, Upload, CheckCircle, Download } from "lucide-react";

const howItWorksData = [
  {
    id: uuidv4(),
    step: 1,
    title: "Register Online",
    description: "Fill personal and travel details",
    icon: <MousePointerClick size={40} className="text-(--color-primary)" />,
  },
  {
    id: uuidv4(),
    step: 2,
    title: "Upload Documents",
    description: "Submit ID and address proof",
    icon: <Upload size={40} className="text-(--color-primary)" />,
  },
  {
    id: uuidv4(),
    step: 3,
    title: "Verification",
    description: "Authority reviews application",
    icon: <CheckCircle size={40} className="text-(--color-primary)" />,
  },
  {
    id: uuidv4(),
    step: 4,
    title: "Download Pass",
    description: "Instant digital bus pass",
    icon: <Download size={40} className="text-(--color-primary)" />,
  },
];

export const Works = () => {
  return (
    <div className="mt-25 px-20">
      <h1 className="text-3xl uppercase text-center font-semibold">
        How It Works
      </h1>
      <div className="mt-10 flex gap-10 justify-between">
        {howItWorksData.map((data, index) => (
          <div className="bg-white flex items-center gap-5 flex-col shadow-lg rounded-xl px-8 py-10" key={data.id}>
            <span>{data.icon}</span>
            <span className="rounded-full w-7 h-7 flex items-center justify-center bg-green-500 text-white">{data.step}</span>
            <h3 className="text-[1.2rem] font-semibold">{data.title}</h3>
            <p className="text-[.9rem] text-black/50">{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
