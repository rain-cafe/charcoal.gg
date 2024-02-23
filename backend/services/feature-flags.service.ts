export enum FeatureFlag {
  Campaigns,
  Games,
  Characters,
}

export enum Environment {
  Live = 'live',
  Alpha = 'alpha',
  Local = 'local',
}

export type FeatureFlagValue =
  | boolean
  | {
      [key in Environment]?: boolean;
    };

const FEATURE_FLAGS: Record<FeatureFlag, FeatureFlagValue> = {
  [FeatureFlag.Campaigns]: {
    [Environment.Local]: true,
    [Environment.Alpha]: true,
  },
  [FeatureFlag.Games]: {
    [Environment.Local]: true,
    [Environment.Alpha]: true,
  },
  [FeatureFlag.Characters]: {
    [Environment.Local]: true,
    [Environment.Alpha]: true,
  },
};

export const environment: Environment =
  process.env.ENVIRONMENT && Object.values(Environment).includes(process.env.ENVIRONMENT as Environment)
    ? (process.env.ENVIRONMENT as Environment)
    : Environment.Local;

export class FeatureFlagService {
  /**
   * Retrieves the feature flag for the current environment
   * @param flag The flag to retrieve
   * @param defaultValue The default value of the flag
   * @returns if the feature flag is enabled
   */
  static enabled(flag: FeatureFlag, defaultValue: boolean = false): boolean {
    const value = FEATURE_FLAGS[flag];

    if (typeof value === 'boolean') return value;

    return value[environment] ?? defaultValue;
  }

  /**
   * Retrieves the feature flag for the current environment
   * @param flag The flag to retrieve
   * @param defaultValue The default value of the flag
   * @returns if the feature flag is disabled
   */
  static disabled(flag: FeatureFlag, defaultValue?: boolean): boolean {
    return !FeatureFlagService.enabled(flag, defaultValue);
  }
}
