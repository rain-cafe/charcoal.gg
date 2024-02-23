import { CharacterService } from '@/backend/services/character.service';
import { getOrAsNumber } from '@/backend/utils/params';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: NextRequest) {
  const characters = await CharacterService.search({
    page: getOrAsNumber(request, 'page'),
    size: getOrAsNumber(request, 'size'),
  });

  return NextResponse.json(characters);
}
