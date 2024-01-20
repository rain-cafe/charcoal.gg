import { EnvironmentService, FeatureFlag } from '@/backend/services/environment.service';
import { redirect } from 'next/navigation';

export default async function Campaigns() {
  const isDisabled = EnvironmentService.disabled(FeatureFlag.Campaigns);

  if (isDisabled) return redirect('/');

  return <div className="flex flex-wrap justify-center gap-4">WIP</div>;
}
