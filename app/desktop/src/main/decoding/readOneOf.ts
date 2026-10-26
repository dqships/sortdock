export function readOneOf<Value extends string>(value: unknown, allowed: readonly Value[], fallback: Value): Value {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as Value) : fallback;
}
