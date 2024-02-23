import { FeatureFlag, FeatureFlagService } from '@/backend/services/feature-flags.service';

export default async function Games() {
  const isDisabled = FeatureFlagService.disabled(FeatureFlag.Games);

  if (isDisabled) return null;

  return <div className="flex flex-wrap justify-center gap-4">WIP</div>;
}
