import type { Character } from '@prisma/client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-nowrap whitespace-nowrap">
          {character.first_name} {character.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-auto aspect-square">
          <Image className="rounded-lg" fill src="/profile.png" alt="character profile" />
        </div>
      </CardContent>
    </Card>
  );
}
