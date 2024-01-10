import { Character, Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

let initialized = false;

const prisma = new PrismaClient().$extends(
  Prisma.defineExtension({
    name: 'encrypt-password',
    query: {
      user: {
        async $allOperations({ operation, args, query }) {
          if (
            (operation === 'create' || operation === 'update') &&
            args.data.password &&
            !/^\$2(?:a|b)\$/.test(args.data.password.toString())
          ) {
            args.data.password = hashSync(args.data.password.toString(), 10);
          }

          return query(args);
        },
      },
    },
  })
);

export async function getDatabase() {
  if (!initialized) {
    initialized = true;

    await prisma.character.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: {
        email: 'test@rains.cafe',
        display_name: 'admin',
        password: 'admin',
      },
    });

    console.log(user.id);

    await prisma.character.createMany({
      data: Array(200)
        .fill(null)
        .map<Omit<Character, 'id'>>((_, index) => ({
          age: 21,
          gender: 'female',
          first_name: 'Luna',
          last_name: 'Evergreen',
          description:
            'Luna has a long face, with black hair and bright blue eyes. She wears studded leather and wields a warhammer. Luna has a grey wolf named Ariendel.',
          bio: '',
          creator_id: user.id,
        })),
    });
  }

  return prisma;
}
