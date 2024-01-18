import { CharacterService } from '@/backend/services/character.service';
import { CharacterCard } from '@/components/CharacterCard';

export default async function Home() {
  const characters = await CharacterService.search({
    size: 16,
  });

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
