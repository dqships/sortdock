import { useState } from "react";

import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { OptionsMenu } from "../Components/OptionsMenu";
import { SectionTitle } from "../Components/SectionTitle";
import { PlusIcon } from "../Icons/PlusIcon";
import { DestinationRowView } from "./DestinationRowView";

type DestinationListViewProps = {
  onAddNamedFolder: () => void;
  onRename: (destinationId: string) => void;
};

export function DestinationListView({ onAddNamedFolder, onRename }: DestinationListViewProps) {
  const { destinations, watchedFolderName } = useSnapshot();
  const [selectedId, setSelectedId] = useState<string | null>(destinations[0]?.id ?? null);

  return (
    <section className="section" aria-labelledby="destinations-title">
      <div className="section-header">
        <SectionTitle id="destinations-title" title="Destinations" />
        <OptionsMenu
          label="Add destination"
          icon={<PlusIcon />}
          items={[
            {
              label: "Choose or Create Folder…",
              onSelect: () =>
                void actions.chooseDestinationFolder().then((id) => {
                  if (id) {
                    setSelectedId(id);
                  }
                }),
            },
            { label: `New Folder in ${watchedFolderName}…`, onSelect: onAddNamedFolder },
          ]}
        />
      </div>
      <div className="destination-list">
        {destinations.map((destination) => (
          <DestinationRowView
            key={destination.id}
            destination={destination}
            isSelected={destination.id === selectedId}
            onSelect={() => setSelectedId(destination.id)}
            onRename={() => onRename(destination.id)}
          />
        ))}
      </div>
    </section>
  );
}
