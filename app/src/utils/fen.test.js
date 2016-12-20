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
  it('board at start', () => {
    const board = {
      a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r',
      a7: 'p', b7: 'p', c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
      a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: 'P',
      a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B', g1: 'N', h1: 'R',
    };
    expect(JSON.stringify(getBoardStateFromFEN(FEN_START)))
      .toEqual(JSON.stringify(board));
  });

  it('board after 3 moves', () => {
    const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    const board = {
      a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r',
      a7: 'p', b7: 'p',          d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
                        c5: 'p',
                                          e4: 'P',
                                                   f3: 'N',
      a2: 'P', b2: 'P', c2: 'P', d2: 'P',          f2: 'P', g2: 'P', h2: 'P',
      a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B',          h1: 'R',
    };
    expect(JSON.stringify(getBoardStateFromFEN(fen)))
      .toEqual(JSON.stringify(board));
  });

  it('an empty board', () => {
    const fen = '8/8/8/8/8/8/8/8 b KQkq - 1 2';
    const board = {};
    expect(JSON.stringify(getBoardStateFromFEN(fen)))
      .toEqual(JSON.stringify(board));
  });
});
