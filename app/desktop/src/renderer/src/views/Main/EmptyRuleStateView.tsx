export function EmptyRuleStateView({ onAddRule }: { onAddRule: () => void }) {
  return (
    <div className="empty-state">
      <p className="footnote">Add your first rule. Start with PDFs, images, or anything you download often.</p>
      <button type="button" className="button button-primary" onClick={onAddRule}>
        Add Rule
      </button>
    </div>
  );
}
