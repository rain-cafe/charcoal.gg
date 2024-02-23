import { NextRequest } from 'next/server';

export type Context<T extends object> = {
  params: T;
};

export type CharacterRouteContext = Context<{
  id: string;
}>;

export const dynamic = 'force-static';
export async function GET(request: NextRequest, { params }: CharacterRouteContext) {
  return Response.json(
    {
      status: 400,
      status_code: 'unknown_route',
      message:
        'Oh no! The route your looking for is in another castle! Please check out our docs at docs.charcoal.gg to ensure you have the right',
    },
    {
      status: 400,
    }
  );
}
