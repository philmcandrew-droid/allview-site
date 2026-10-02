import type { MediaBlock } from "../data/section-media";

export function SectionGallery({ block }: { block: MediaBlock }) {
  const listClass =
    block.layout === "stack"
      ? "mt-4 space-y-4"
      : block.layout === "icons"
        ? "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"
        : "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section aria-label={block.title} className="mt-10">
      <h2 className="font-ui text-2xl font-semibold text-navy">{block.title}</h2>
      <ul className={listClass}>
        {block.items.map((item) => (
          <li
            key={`${item.src}-${item.alt}`}
            className={
              block.layout === "icons"
                ? "flex h-28 items-center justify-center rounded-2xl border border-line bg-paper p-4"
                : block.surface === "navy"
                  ? "overflow-hidden rounded-2xl bg-navy p-4"
                  : "overflow-hidden rounded-2xl border border-line bg-paper"
            }
          >
            <img
              alt={item.alt}
              className={
                block.layout === "icons" ? "max-h-16 w-auto max-w-full object-contain" : "h-auto w-full object-contain"
              }
              loading="lazy"
              src={item.src}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
