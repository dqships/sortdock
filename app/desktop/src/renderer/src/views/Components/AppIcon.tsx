import iconUrl from "../../assets/icon.png";

export function AppIcon({ size }: { size: number }) {
  return <img className="app-icon" src={iconUrl} width={size} height={size} alt="" />;
}
