import { CharacterService } from '@/backend/services/character.service';
import { CharacterCard } from '@/components/CharacterCard';

export default async function Home() {
  const characters = await CharacterService.search({
    size: 10,
  });

  return (
    <div className="grid gap-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
