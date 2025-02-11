import React from "react";
import Board from './components/Board/Board';

interface State {
  history: string[][],
  nextStep: 'X' | 'O',
  lastMove: number | null,
}

const initialSquares = Array(9).fill(null);
const initialBoard: State = {
  history: [initialSquares],
  nextStep: 'X',
  lastMove: null,
};

export default class Game extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = initialBoard;
  }

  handleSquareClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];

    if (current[i] || calculateWinner(current, this.state.lastMove)) {
      return;
    }

    const squares = current.slice();
    squares[i] = this.state.nextStep;

    this.setState(prev => ({
      history: [...prev.history, squares],
      nextStep: prev.nextStep === 'X' ? 'O' : 'X',
      lastMove: i,
    }))
  }

  jumpTo(move: number) {
    const updatedHistory = this.state.history.slice(0, move + 1);
    const updatedMove = (move === 0)
      ?
        null
      :
        updatedHistory[move]
          .findIndex((square, index) => square !== this.state.history[move - 1][index]);

    this.setState({
      history: updatedHistory,
      nextStep: (move % 2 !== 0) ? 'O' : 'X',
      lastMove: updatedMove,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current, this.state.lastMove);
    const status = winner
      ?
      <span>{'Winner: ' + winner + " ! ! !"}</span>
      :
      'Next player: ' + (this.state.nextStep === 'X' ? ' X' : ' O');
    
    const moves = history.map((_step, move) => {
      const desc = move ?
        `Go to move #${move}`
        :
        `Go to game start`;
      
      return (
        <li key={move} className="history__item">
          <button
            className="history__button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game__board">
          <div className="status">
            {status}
          </div>

          <Board
            squares={current}
            onClick={(i: number) => this.handleSquareClick(i)}
          />
        </div>

        <div className="game__history history">
            <ul className="history__list">
              {moves}
            </ul>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares: string[], lastMove: number | null) {
  if (lastMove === null) {
    return;
  };

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const relevantLines = winningLines.filter(line => line.includes(lastMove));

  console.log('relevantLines: ', relevantLines);
  
  for (const [a, b, c] of relevantLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return;
}



