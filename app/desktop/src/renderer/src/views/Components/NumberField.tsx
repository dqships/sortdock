type NumberFieldProps = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function NumberField({ label, unit, value, min, max, onChange }: NumberFieldProps) {
  return (
    <label className="number-field">
      <input
        className="text-field"
        type="number"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const next = Number.parseInt(event.target.value, 10);

          if (Number.isFinite(next)) {
            onChange(Math.min(Math.max(next, min), max));
          }
        }}
      />
      {unit}
    </label>
  );
}
