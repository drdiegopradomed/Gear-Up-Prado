"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  mainImage,
  images,
  alt,
  badge,
}: {
  mainImage: string;
  images?: string[];
  alt: string;
  badge?: string;
}) {
  const all = [mainImage, ...(images ?? [])].filter(Boolean);
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden border border-slate-700">
        <Image src={all[active]} alt={alt} fill className="object-cover" priority />
        {badge && (
          <span className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-sm font-bold px-3 py-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {all.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {all.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-amber-500" : "border-slate-700 hover:border-slate-500"
              }`}
            >
              <Image src={url} alt={`${alt} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
