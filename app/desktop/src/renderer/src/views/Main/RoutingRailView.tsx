import { useState } from "react";

import { useSnapshot } from "../../state/useSnapshot";
import { SectionTitle } from "../Components/SectionTitle";
import { PlusIcon } from "../Icons/PlusIcon";
import { EmptyRuleStateView } from "./EmptyRuleStateView";
import { RoutingRuleRowView } from "./RoutingRuleRowView";

type RoutingRailViewProps = {
  onAddRule: () => void;
  onEditRule: (ruleId: string) => void;
};

/** The routing rail: file type tags on the left, connected to their folders on the right. */
export function RoutingRailView({ onAddRule, onEditRule }: RoutingRailViewProps) {
  const { rules, settings } = useSnapshot();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="section" aria-labelledby="file-types-title">
      <div className="section-header">
        <SectionTitle id="file-types-title" title="File Types" />
        <button type="button" className="button-borderless" onClick={onAddRule}>
          <PlusIcon /> Add Rule
        </button>
      </div>
      {rules.length === 0 ? (
        <EmptyRuleStateView onAddRule={onAddRule} />
      ) : (
        <div className="rail-list">
          {rules.map((rule) => (
            <RoutingRuleRowView
              key={rule.id}
              rule={rule}
              isSelected={rule.id === selectedId}
              onEdit={() => {
                setSelectedId(rule.id);
                onEditRule(rule.id);
              }}
            />
          ))}
          <div className="rail-fallback">
            <span>Other files</span>
            <span className="rail-fallback-track" aria-hidden="true" />
            <span>{settings.defaultDestinationId === null ? "Leave in place" : "Default folder"}</span>
          </div>
        </div>
      )}
    </section>
  );
}
