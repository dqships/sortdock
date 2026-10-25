import type { AppUpdate } from "../../../../shared/models/AppUpdate";
import { actions } from "../../state/actions";

export function UpdateNoticeView({ update }: { update: AppUpdate }) {
  return (
    <section className="notice" aria-label="Update available">
      <div className="notice-text">
        <p className="notice-title">A newer version of SortDock is ready</p>
        <p className="footnote">Version {update.version} is ready to download.</p>
      </div>
      <button type="button" className="button button-primary" onClick={() => void actions.openUpdate()}>
        Update SortDock
      </button>
    </section>
  );
}
