import { FeatureFlag, FeatureFlagService } from '@/backend/services/feature-flags.service';

export default async function Campaigns() {
  const isDisabled = FeatureFlagService.disabled(FeatureFlag.Campaigns);

  if (isDisabled) return null;

  return <div className="flex flex-wrap justify-center gap-4">WIP</div>;
}
