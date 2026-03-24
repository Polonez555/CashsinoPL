import { NextRequest, NextResponse } from 'next/server';
import { spin, getWinner, validateBet } from '@/lib/games/roulette';
import type { RouletteBet } from '@/lib/games/roulette';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bets } = body;

    if (!Array.isArray(bets)) {
      return NextResponse.json(
        { error: 'Bets must be an array' },
        { status: 400 }
      );
    }

    // Validate all bets
    for (const bet of bets) {
      if (!validateBet(bet)) {
        return NextResponse.json(
          { error: 'Invalid bet', bet },
          { status: 400 }
        );
      }
    }

    // Spin the wheel
    const winningNumber = spin();
    
    // Calculate winners and payouts
    const result = getWinner(winningNumber, bets);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}