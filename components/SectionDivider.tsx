export function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="flex items-center gap-4 py-2">
        <span className="h-px flex-1 bg-line-soft" style={{ background: "var(--color-line-soft)" }} />
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rotate-45 bg-amber/70" />
        <span className="h-px flex-1 bg-line-soft" style={{ background: "var(--color-line-soft)" }} />
      </div>
    </div>
  );
}
