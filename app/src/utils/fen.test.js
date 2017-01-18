import { COLOR_WHITE, COLOR_BLACK, FEN_START } from './constants';
import {
  getActiveColorFromFEN,
  getFullMoveCountFromFEN,
  getEnPassantTargetSquareFromFEN,
  getBoardStateFromFEN,
} from './fen';

/*
https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

A FEN record contains six fields. The separator between fields is a space. The fields are:

  1. Piece placement (from white's perspective). Each rank is described, starting with rank 8 and ending with rank 1;
    within each rank, the contents of each square are described from file "a" through file "h". Following the
    Standard Algebraic Notation (SAN), each piece is identified by a single letter taken from the standard English
    names (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K").[1]
    White pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase
    ("pnbrqk"). Empty squares are noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.

  2. Active color. "w" means White moves next, "b" means Black.

  3. Castling availability. If neither side can castle, this is "-". Otherwise, this has one or more letters: "K" (White
    can castle kingside), "Q" (White can castle queenside), "k" (Black can castle kingside), and/or "q" (Black can
    castle queenside).

  4. En passant target square in algebraic notation. If there's no en passant target square, this is "-". If a pawn has
    just made a two-square move, this is the position "behind" the pawn. This is recorded regardless of whether there
    is a pawn in position to make an en passant capture.[2]

  5. Halfmove clock: This is the number of halfmoves since the last capture or pawn advance. This is used to determine
    if a draw can be claimed under the fifty-move rule.

  6. Fullmove number: The number of the full move. It starts at 1, and is incremented after Black's move.
*/

// const testFen1  = '4kb1r/p4ppp/4q3/8/8/1B6/PPP2PPP/2KR4 w KQkq - 0 1';
// const testFen2  = 'r1bq1rk1/pp3ppp/3n4/2p1N3/2B5/7P/PPP2PP1/R1BQR1K1 w KQkq - 0 1';

describe('fen.getActiveColorFromFEN', () => {
  it('at start the active color is white', () => {
    expect(getActiveColorFromFEN(FEN_START)).toEqual(COLOR_WHITE);
  });

  it('after whites first move, its blacks turn', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
    expect(getActiveColorFromFEN(fen)).toEqual(COLOR_BLACK);
  });

  it('after blacks first move, its whites turn again', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2';
    expect(getActiveColorFromFEN(fen)).toEqual(COLOR_WHITE);
  });

  it('after whites turn, then its blacks turn', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    expect(getActiveColorFromFEN(fen)).toEqual(COLOR_BLACK);
  });
});


describe('fen.getFullMoveCountFromFEN', () => {
  it('the count starts at 1', () => {
    expect(getFullMoveCountFromFEN(FEN_START)).toEqual(1);
  });

  it('on blacks first turn, count is still 1', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
    expect(getFullMoveCountFromFEN(fen)).toEqual(1);
  });

  it('on whites second move the count is 2', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2';
    expect(getFullMoveCountFromFEN(fen)).toEqual(2);
  });

  it('on blacks second move the count is 2', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    expect(getFullMoveCountFromFEN(fen)).toEqual(2);
  });
});


describe('fen.getEnPassantTargetSquareFromFEN', () => {
  it(`returns 'undefined' at start`, () => {
    expect(getEnPassantTargetSquareFromFEN(FEN_START)).toBeUndefined();
  });

  it(`returns 'undefined' at if en passant is not available`, () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    expect(getEnPassantTargetSquareFromFEN(fen)).toBeUndefined();
  });

  it(`returns algebraic target square if en passant target is avaialble`, () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq d4 1 2';
    expect(getEnPassantTargetSquareFromFEN(fen)).toEqual('d4');
  });
});

describe('fen.getBoardStateFromFEN', () => {
  const nil = null;

  it('board at start', () => {
    const board = {
      7: 'r', 17: 'n', 27: 'b', 37: 'q', 47: 'k', 57: 'b', 67: 'n', 77: 'r',
      6: 'p', 16: 'p', 26: 'p', 36: 'p', 46: 'p', 56: 'p', 66: 'p', 76: 'p',
      5: nil, 15: nil, 25: nil, 35: nil, 45: nil, 55: nil, 65: nil, 75: nil,
      4: nil, 14: nil, 24: nil, 34: nil, 44: nil, 54: nil, 64: nil, 74: nil,
      3: nil, 13: nil, 23: nil, 33: nil, 43: nil, 53: nil, 63: nil, 73: nil,
      2: nil, 12: nil, 22: nil, 32: nil, 42: nil, 52: nil, 62: nil, 72: nil,
      1: 'P', 11: 'P', 21: 'P', 31: 'P', 41: 'P', 51: 'P', 61: 'P', 71: 'P',
      0: 'R', 10: 'N', 20: 'B', 30: 'Q', 40: 'K', 50: 'B', 60: 'N', 70: 'R',
    };
    expect(JSON.stringify(getBoardStateFromFEN(FEN_START)))
      .toEqual(JSON.stringify(board));
  });

  it('board after 3 moves', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    const board = {
      7: 'r', 17: 'n', 27: 'b', 37: 'q', 47: 'k', 57: 'b', 67: 'n', 77: 'r',
      6: 'p', 16: 'p', 26: nil, 36: 'p', 46: 'p', 56: 'p', 66: 'p', 76: 'p',
      5: nil, 15: nil, 25: nil, 35: nil, 45: nil, 55: nil, 65: nil, 75: nil,
      4: nil, 14: nil, 24: 'p', 34: nil, 44: nil, 54: nil, 64: nil, 74: nil,
      3: nil, 13: nil, 23: nil, 33: nil, 43: 'P', 53: nil, 63: nil, 73: nil,
      2: nil, 12: nil, 22: nil, 32: nil, 42: nil, 52: 'N', 62: nil, 72: nil,
      1: 'P', 11: 'P', 21: 'P', 31: 'P', 41: nil, 51: 'P', 61: 'P', 71: 'P',
      0: 'R', 10: 'N', 20: 'B', 30: 'Q', 40: 'K', 50: 'B', 60: nil, 70: 'R',
    };

    expect(JSON.stringify(getBoardStateFromFEN(fen)))
      .toEqual(JSON.stringify(board));
  });

  it('an empty board', () => {
    const fen = '8/8/8/8/8/8/8/8 b KQkq - 1 2';
    const board = {
      7: nil, 17: nil, 27: nil, 37: nil, 47: nil, 57: nil, 67: nil, 77: nil,
      6: nil, 16: nil, 26: nil, 36: nil, 46: nil, 56: nil, 66: nil, 76: nil,
      5: nil, 15: nil, 25: nil, 35: nil, 45: nil, 55: nil, 65: nil, 75: nil,
      4: nil, 14: nil, 24: nil, 34: nil, 44: nil, 54: nil, 64: nil, 74: nil,
      3: nil, 13: nil, 23: nil, 33: nil, 43: nil, 53: nil, 63: nil, 73: nil,
      2: nil, 12: nil, 22: nil, 32: nil, 42: nil, 52: nil, 62: nil, 72: nil,
      1: nil, 11: nil, 21: nil, 31: nil, 41: nil, 51: nil, 61: nil, 71: nil,
      0: nil, 10: nil, 20: nil, 30: nil, 40: nil, 50: nil, 60: nil, 70: nil,
    };
    expect(JSON.stringify(getBoardStateFromFEN(fen)))
      .toEqual(JSON.stringify(board));
  });

  it('board with two 1 in same rank ', () => {
    const fen = 'rnbqkbnr/ppp1pppp/8/8/8/8/PPP4P/RNB1K1NR w KQkq - 0 1';
    const board = {
      7: 'r', 17: 'n', 27: 'b', 37: 'q', 47: 'k', 57: 'b', 67: 'n', 77: 'r',
      6: 'p', 16: 'p', 26: 'p', 36: nil, 46: 'p', 56: 'p', 66: 'p', 76: 'p',
      5: nil, 15: nil, 25: nil, 35: nil, 45: nil, 55: nil, 65: nil, 75: nil,
      4: nil, 14: nil, 24: nil, 34: nil, 44: nil, 54: nil, 64: nil, 74: nil,
      3: nil, 13: nil, 23: nil, 33: nil, 43: nil, 53: nil, 63: nil, 73: nil,
      2: nil, 12: nil, 22: nil, 32: nil, 42: nil, 52: nil, 62: nil, 72: nil,
      1: 'P', 11: 'P', 21: 'P', 31: nil, 41: nil, 51: nil, 61: nil, 71: 'P',
      0: 'R', 10: 'N', 20: 'B', 30: nil, 40: 'K', 50: nil, 60: 'N', 70: 'R',
    };

    expect(JSON.stringify(getBoardStateFromFEN(fen)))
      .toEqual(JSON.stringify(board));
  });
});
