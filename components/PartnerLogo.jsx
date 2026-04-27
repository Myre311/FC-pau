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
      className="flex items-center justify-center h-24 md:h-28 rounded-lg border border-pau-gold/20 bg-white/5 hover:border-pau-gold/60 transition-colors p-6"
    >
      {logo && !errored ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={60}
          onError={() => setErrored(true)}
          className="object-contain max-h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
        />
      ) : (
        <span className="text-white/80 text-sm tracking-widest font-semibold uppercase">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
