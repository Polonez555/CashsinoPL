import { NextRequest, NextResponse } from 'next/server';
import { deal, hit, stand } from '@/lib/games/blackjack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, game } = body;

    if (action === 'deal') {
      const newGame = deal();
      return NextResponse.json({
        success: true,
        game: newGame,
      });
    }

    if (action === 'hit') {
      if (!game) {
        return NextResponse.json(
          { error: 'Game state is required for hit action' },
          { status: 400 }
        );
      }
      const updatedGame = hit(game);
      return NextResponse.json({
        success: true,
        game: updatedGame,
      });
    }

    if (action === 'stand') {
      if (!game) {
        return NextResponse.json(
          { error: 'Game state is required for stand action' },
          { status: 400 }
        );
      }
      const updatedGame = stand(game);
      return NextResponse.json({
        success: true,
        game: updatedGame,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Must be deal, hit, or stand' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}