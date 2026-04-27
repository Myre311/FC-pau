export default function SectionLight({ children, className = "" }) {
  return (
    <section className={`bg-white text-pau-primary py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
