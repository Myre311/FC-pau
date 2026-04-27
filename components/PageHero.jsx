import Image from "next/image";

export default function PageHero({
  image,
  surtitle,
  title,
  subtitle,
  align = "left", // "left" | "center"
}) {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-pau-primary/60 via-pau-primary/50 to-pau-primary/85" />
      <div className="absolute inset-0 flex items-end">
        <div
          className={`mx-auto w-full max-w-7xl px-6 pb-10 md:pb-14 ${
            align === "center" ? "text-center" : "text-left"
          }`}
        >
          {surtitle && (
            <p className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-pau-yellow uppercase mb-3">
              {surtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none uppercase tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
