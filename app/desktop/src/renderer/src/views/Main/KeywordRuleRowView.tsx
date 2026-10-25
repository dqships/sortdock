import type { KeywordRule } from "../../../../shared/models/KeywordRule";
import { actions } from "../../state/actions";
import { destinationNameFor } from "../../state/destinationNameFor";
import { useSnapshot } from "../../state/useSnapshot";
import { OptionsMenu } from "../Components/OptionsMenu";
import { ChevronIcon } from "../Icons/ChevronIcon";
import { EllipsisIcon } from "../Icons/EllipsisIcon";
import { FolderIcon } from "../Icons/FolderIcon";

type KeywordRuleRowViewProps = {
  rule: KeywordRule;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  onEdit: () => void;
};

export function KeywordRuleRowView({ rule, isFirst, isLast, isSelected, onEdit }: KeywordRuleRowViewProps) {
  const { destinations } = useSnapshot();
  const summary = rule.keywords.join(", ");
  const destinationName = destinationNameFor(destinations, rule.destinationId);

  return (
    <div
      className={rule.isEnabled ? "keyword-row" : "keyword-row keyword-row-disabled"}
      aria-current={isSelected}
    >
      <input
        type="checkbox"
        checked={rule.isEnabled}
        aria-label={`${summary} rule is on`}
        onChange={(event) => void actions.setKeywordRuleEnabled(rule.id, event.target.checked)}
      />
      <button
        type="button"
        className="keyword-edit"
        onClick={onEdit}
        aria-label={`Edit ${summary} rule, moves to ${destinationName}`}
      >
        <span className="keyword-summary truncate">{summary}</span>
        <span className="keyword-destination">
          <FolderIcon size={12} />
          <span className="truncate">{destinationName}</span>
        </span>
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={isFirst}
        title="Move rule earlier"
        aria-label={`Move ${summary} earlier`}
        onClick={() => void actions.moveKeywordRule(rule.id, "up")}
      >
        <ChevronIcon direction="up" />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={isLast}
        title="Move rule later"
        aria-label={`Move ${summary} later`}
        onClick={() => void actions.moveKeywordRule(rule.id, "down")}
      >
        <ChevronIcon direction="down" />
      </button>
      <OptionsMenu
        label={`More options for ${summary}`}
        icon={<EllipsisIcon />}
        items={[
          { label: "Edit", onSelect: onEdit },
          { label: "Remove", onSelect: () => void actions.deleteKeywordRule(rule.id), isDestructive: true },
        ]}
      />
    </div>
  );
}
