import { CharacterService } from '@/backend/services/character.service';
import { CharacterCard } from '@/components/CharacterCard';
import { cn } from '@/lib/utils';
import * as styles from './page.module.css';

export default async function Characters() {
  const characters = await CharacterService.search({
    size: 16,
  });

  return (
    <div className={cn('grid flex-wrap bg-background/70 rounded-lg p-8 justify-center gap-4', styles.characters)}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
