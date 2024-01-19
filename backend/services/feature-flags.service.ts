export enum FeatureFlag {
  Campaigns,
  Games,
}

export type FeatureFlagValue =
  | boolean
  | {
      [key in NodeJS.ProcessEnv['NODE_ENV']]?: boolean;
    };

const FEATURE_FLAGS: Record<FeatureFlag, FeatureFlagValue> = {
  [FeatureFlag.Campaigns]: {
    development: true,
    test: true,
  },
  [FeatureFlag.Games]: {
    development: true,
    test: true,
  },
};

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

    return value[process.env.NODE_ENV] ?? defaultValue;
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
