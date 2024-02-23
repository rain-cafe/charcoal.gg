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
      <CardContent className="flex gap-4">
        <Image className="rounded-lg" width={200} height={200} src="/profile.png" alt="character profile" />
        <div>{character.description}</div>
      </CardContent>
    </Card>
  );
}
