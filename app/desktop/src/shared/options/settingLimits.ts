export const settingLimits = {
  customDelaySeconds: { min: 1, max: 300 },
  customSnoozeMinutes: { min: 1, max: 180 },
  onboardingStep: { min: 1, max: 6 },
} as const;
