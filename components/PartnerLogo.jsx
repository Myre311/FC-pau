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
      className="flex items-center justify-center h-24 md:h-28 rounded-lg border-2 border-pau-primary/10 bg-pau-primary/5 hover:border-pau-gold hover:bg-pau-primary/10 transition-all p-6"
    >
      {logo && !errored ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={60}
          onError={() => setErrored(true)}
          className="object-contain max-h-14 w-auto opacity-90 hover:opacity-100 transition-opacity"
        />
      ) : (
        <span className="text-pau-primary text-sm tracking-widest font-semibold uppercase">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
