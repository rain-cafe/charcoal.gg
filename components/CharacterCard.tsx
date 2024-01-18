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
        <CardTitle className="flex justify-between items-center">
          {character.first_name} {character.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <div className="relative min-w-52 min-h-52 rounded-lg overflow-hidden aspect-square">
          <Image fill src="/profile.png" alt="character profile" />
        </div>
      </CardContent>
    </Card>
  );
}
