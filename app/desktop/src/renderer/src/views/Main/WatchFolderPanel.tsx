import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { FolderIcon } from "../Icons/FolderIcon";
import { SectionTitle } from "../Components/SectionTitle";

export function WatchFolderPanel() {
  const { settings } = useSnapshot();

  return (
    <section className="panel" aria-labelledby="watch-folder-title">
      <SectionTitle id="watch-folder-title" title="Watch Folder" />
      <p className="folder-path">
        <FolderIcon />
        <span>{settings.watchedFolderPath}</span>
      </p>
      {!settings.hasChosenWatchedFolder && (
        <p className="footnote">Choose the folder SortDock should keep tidy.</p>
      )}
      <div>
        <button type="button" className="button" onClick={() => void actions.chooseWatchedFolder()}>
          {settings.hasChosenWatchedFolder ? "Change…" : "Choose Folder"}
        </button>
      </div>
    </section>
  );
}
