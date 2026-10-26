import type { RoutingRule } from "../../../../shared/models/RoutingRule";
import { actions } from "../../state/actions";
import { destinationNameFor } from "../../state/destinationNameFor";
import { useSnapshot } from "../../state/useSnapshot";
import { ExtensionTag } from "../Components/ExtensionTag";
import { OptionsMenu } from "../Components/OptionsMenu";
import { EllipsisIcon } from "../Icons/EllipsisIcon";
import { FolderIcon } from "../Icons/FolderIcon";

type RoutingRuleRowViewProps = {
  rule: RoutingRule;
  isSelected: boolean;
  onEdit: () => void;
};

export function RoutingRuleRowView({ rule, isSelected, onEdit }: RoutingRuleRowViewProps) {
  const { destinations } = useSnapshot();
  const destinationName = destinationNameFor(destinations, rule.destinationId);
  const endings = rule.extensions.map((extension) => `.${extension}`).join(", ");

  return (
    <div className="rail-row" aria-current={isSelected}>
      <button
        type="button"
        className="rail-tags rail-tags-button"
        onClick={onEdit}
        aria-label={`${endings} moves to ${destinationName}. Edit rule.`}
      >
        {rule.extensions.map((extension) => (
          <ExtensionTag key={extension} value={extension} />
        ))}
      </button>
      <span className="rail-track" aria-hidden="true" />
      <span className="rail-destination">
        <FolderIcon />
        <span className="truncate grow">
          {destinationName}
        </span>
        <OptionsMenu
          label={`More options for ${endings}`}
          icon={<EllipsisIcon />}
          items={[
            { label: "Edit", onSelect: onEdit },
            { label: "Duplicate", onSelect: () => void actions.duplicateRule(rule.id) },
            { label: "Remove", onSelect: () => void actions.deleteRule(rule.id), isDestructive: true },
          ]}
        />
      </span>
    </div>
  );
}
