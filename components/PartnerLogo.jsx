'use client';

import Image from "next/image";
import { useState } from "react";

export default function PartnerLogo({ name, logo, href }) {
  const [errored, setErrored] = useState(false);
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-center h-24 md:h-28 transition-all p-4"
    >
      {logo && !errored ? (
        <Image
          src={logo}
          alt={name}
          width={160}
          height={80}
          onError={() => setErrored(true)}
          className="object-contain max-h-16 w-auto transition-all duration-300 group-hover:scale-110"
          style={{
            filter: 'brightness(0) saturate(100%) invert(67%) sepia(73%) saturate(462%) hue-rotate(3deg) brightness(95%) contrast(102%)',
            opacity: 0.7
          }}
        />
      ) : (
        <span className="text-pau-gold text-sm tracking-widest font-semibold uppercase opacity-70">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
