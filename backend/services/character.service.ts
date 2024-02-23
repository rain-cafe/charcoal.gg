import { getDatabase } from '../database';

export class CharacterService {
  static async search({ page = 1, size = 100 }: { page?: number; size?: number } = {}) {
    const db = await getDatabase();

    return db.character.findMany({
      take: Math.min(size, 100),
      skip: (Math.max(page, 1) - 1) * size,
    });
  }
}
