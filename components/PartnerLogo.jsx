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
      className="group flex items-center justify-center h-24 md:h-28 rounded-lg border-2 border-pau-gold/20 bg-pau-gold/5 hover:border-pau-gold hover:bg-pau-gold/10 transition-all p-6"
    >
      {logo && !errored ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={60}
          onError={() => setErrored(true)}
          className="object-contain max-h-14 w-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 sepia group-hover:sepia-0"
          style={{ filter: 'sepia(0.3) saturate(0.8) hue-rotate(20deg)' }}
        />
      ) : (
        <span className="text-pau-gold text-sm tracking-widest font-semibold uppercase">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
