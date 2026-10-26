export function ExtensionTag({ value }: { value: string }) {
  return (
    <span className="extension-tag" aria-label={`${value} files`}>
      .{value}
    </span>
  );
}
