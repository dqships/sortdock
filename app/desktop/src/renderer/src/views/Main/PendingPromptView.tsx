import type { PendingMovePrompt } from "../../../../shared/models/PendingMovePrompt";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";

/** The next file waiting for a decision when SortDock is set to ask first. */
export function PendingPromptView({ prompt }: { prompt: PendingMovePrompt }) {
  const { prompts, settings } = useSnapshot();

  return (
    <section className="notice" aria-label={`Move ${prompt.fileName} to ${prompt.destinationName}?`}>
      <div className="notice-text">
        <p className="notice-title truncate">
          Move “{prompt.fileName}” to {prompt.destinationName}?
        </p>
        <p className="footnote">
          From {prompt.watchedFolderName} · 1 of {prompts.length}
        </p>
      </div>
      <div className="notice-actions">
        <button type="button" className="button" onClick={() => void actions.resolveActivePrompt("chooseFolder")}>
          Choose Folder…
        </button>
        {settings.askLaterEnabled && (
          <button type="button" className="button" onClick={() => void actions.resolveActivePrompt("askLater")}>
            Ask Later
          </button>
        )}
        <button type="button" className="button" onClick={() => void actions.resolveActivePrompt("leave")}>
          Leave
        </button>
        <button type="button" className="button button-primary" onClick={() => void actions.resolveActivePrompt("move")}>
          Move
        </button>
      </div>
    </section>
  );
}
