import { EnvironmentService, FeatureFlag } from '@/backend/services/environment.service';
import { redirect } from 'next/navigation';

export default async function Games() {
  const isDisabled = EnvironmentService.disabled(FeatureFlag.Games);

  if (isDisabled) return redirect('/');

  return <div className="flex flex-wrap justify-center gap-4">WIP</div>;
}
