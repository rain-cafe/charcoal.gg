import { getDatabase } from '@/backend/database';
import { NextResponse } from 'next/server';
import { Context } from '../../types';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request, context: Context<{ id: string }>) {
  const db = await getDatabase();

  let user = await db.user.findFirst({
    where: {
      id: context.params.id,
    },
  });

  if (user) {
    user = await db.user.update({
      data: user,
      where: {
        id: user.id,
      },
    });

    return NextResponse.json(user);
  }

  return NextResponse.json(
    {
      status: 404,
    },
    {
      status: 404,
    }
  );
}
