export function SectionTitle({ title, id }: { title: string; id?: string }) {
  return (
    <h2 className="section-title" id={id}>
      {title}
    </h2>
  );
}
