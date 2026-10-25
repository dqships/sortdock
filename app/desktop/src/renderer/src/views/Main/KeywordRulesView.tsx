import { useState } from "react";

import { useSnapshot } from "../../state/useSnapshot";
import { SectionTitle } from "../Components/SectionTitle";
import { PlusIcon } from "../Icons/PlusIcon";
import { KeywordRuleRowView } from "./KeywordRuleRowView";

type KeywordRulesViewProps = {
  onAddRule: () => void;
  onEditRule: (ruleId: string) => void;
};

export function KeywordRulesView({ onAddRule, onEditRule }: KeywordRulesViewProps) {
  const { keywordRules } = useSnapshot();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="section" aria-labelledby="keywords-title">
      <div className="section-header">
        <SectionTitle id="keywords-title" title="Keywords" />
        <button type="button" className="button-borderless" onClick={onAddRule}>
          <PlusIcon /> Add Rule
        </button>
      </div>
      <p className="footnote">Rules are checked from top to bottom before file types.</p>
      {keywordRules.length === 0 ? (
        <div>
          <button type="button" className="button" onClick={onAddRule}>
            Add a keyword rule
          </button>
        </div>
      ) : (
        <div>
          {keywordRules.map((rule, index) => (
            <KeywordRuleRowView
              key={rule.id}
              rule={rule}
              isFirst={index === 0}
              isLast={index === keywordRules.length - 1}
              isSelected={rule.id === selectedId}
              onEdit={() => {
                setSelectedId(rule.id);
                onEditRule(rule.id);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
