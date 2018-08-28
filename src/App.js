import React, { Component } from 'react';
import './App.css';

const board = {
  rows: 30,
  cols: 50
};

const generateRandomAliveCells = ({ rows, cols }) => {
  const nrOfAliveCellsToGenerate = Math.round(rows * cols * 0.3); // use 30% fill rate of the board
  const arr = [];

  for (let i = 1; i <= nrOfAliveCellsToGenerate; i++) {
    arr.push([
      Math.round(Math.random() * (rows - 1)) + 1,
      Math.round(Math.random() * (cols - 1)) + 1
    ]);
  }

  return arr;
};

// const aliveCells = [[1, 3], [2, 3], [3, 3]];
const aliveCells = generateRandomAliveCells(board);

// Returns an array of positions of neighbours of a cell
const getNeighboursPositions = (cell, boardSize) => {
  const { row, col } = cell;
  const { rows, cols } = boardSize;
  const neighboursOnTopRow = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1]
  ];
  const neighboursOnSameRow = [[row, col - 1], [row, col + 1]];
  const neighboursOnBottomRow = [
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ];
  let potentialNeighbours = [];

  potentialNeighbours = neighboursOnTopRow
    .concat(neighboursOnSameRow)
    .concat(neighboursOnBottomRow);

  return potentialNeighbours.filter(item => {
    const [row, col] = item;
    return row > 0 && row <= rows && col > 0 && col <= cols;
  });
};

// Need to calculate computed state from board. This helps us to make these initial calculations only once.
const initializeCells = ({ rows, cols }, aliveCells) => {
  const cells = {};
  let cell, neighbours;

  // Initialize the each cells object
  for (let row = 1; row <= rows; row++) {
    cells[row] = {};
    for (let col = 1; col <= cols; col++) {
      cells[row][col] = { neighbours: [] };
    }
  }

  // Set the neighbours
  for (let row = 1; row <= board.rows; row++) {
    for (let col = 1; col <= board.cols; col++) {
      cell = { row, col };
      neighbours = getNeighboursPositions(cell, board);
      cells[row][col].neighbours = neighbours.map(neighbour => {
        const [row, col] = neighbour;
        return cells[row][col];
      });
    }
  }

  // Set 'alive' property
  aliveCells.forEach(([row, col]) => {
    cells[row][col].alive = true;
  });

  return cells;
};

class App extends Component {
  state = {
    board,
    aliveCells,
    started: false,
    cells: initializeCells(board, aliveCells),
    intervalId: '',
    generation: 0
  };

  constructor(props) {
    super(props);

    this.addAliveCell = this.addAliveCell.bind(this);
    this.removeAliveCell = this.removeAliveCell.bind(this);
  }

  componentDidMount() {
    this.toggleStart();
  }

  addAliveCell = newAliveCell => {
    const [row, col] = newAliveCell;

    this.state.cells[row][col].alive = true;
  };

  removeAliveCell = newDeadCell => {
    const [row, col] = newDeadCell;

    this.state.cells[row][col].alive = false;
  };

  toggleStart = () => {
    this.setState({ started: !this.state.started }, () => {
      if (this.state.started) {
        this.start();
      } else {
        clearInterval(this.state.intervalId);
      }
    });
  };

  clear = () => {
    this.setState({ generation: 0 });

    // Kill all the cells
    for (let row = 1; row <= board.rows; row++) {
      for (let col = 1; col <= board.cols; col++) {
        this.state.cells[row][col].alive = false;
      }
    }

    if (this.state.started) {
      this.toggleStart();
    }
  };

  randomize = () => {
    const { board } = this.state;
    this.setState({
      cells: initializeCells(board, generateRandomAliveCells(board))
    });
  };

  start = () => {
    this.setState({
      intervalId: setInterval(this.createNextGeneration, 130)
    });
  };

  createNextGeneration = () => {
    const { board, cells } = this.state;
    let cell, aliveNeighboursCellNr;

    const cellsToKill = [];
    const cellsToRevive = [];

    for (let row = 1; row <= board.rows; row++) {
      for (let col = 1; col <= board.cols; col++) {
        cell = cells[row][col];
        aliveNeighboursCellNr = cell.neighbours.filter(n => n.alive).length;
        if (cell.alive) {
          if (aliveNeighboursCellNr <= 1 || aliveNeighboursCellNr >= 4) {
            cellsToKill.push([row, col]);
          }
        } else {
          if (aliveNeighboursCellNr === 3) {
            cellsToRevive.push([row, col]);
          }
        }
      }
    }

    if (!cellsToKill.length && !cellsToRevive.length) {
      this.toggleStart();
      return;
    }

    // Use cellsToKill and cellsToRevive to actually do the changes for the new generation
    cellsToKill.forEach(([row, col]) => {
      this.state.cells[row][col].alive = false;
    });

    cellsToRevive.forEach(([row, col]) => {
      this.state.cells[row][col].alive = true;
    });

    this.setState({
      generation: this.state.generation++
    });

    this.state.generation++;

    this.forceUpdate();
  };

  render() {
    const { board, cells, started, generation } = this.state;
    return (
      <div className="App">
        <h1>
          <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" />
          Game Of Life
        </h1>
        <Board
          board={board}
          cells={cells}
          addAliveCell={this.addAliveCell}
          removeAliveCell={this.removeAliveCell}
          generation={generation}
        />
        <Button onClick={this.toggleStart} className={started ? 'Danger' : ''}>
          {started ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={this.clear} className="Danger">
          Clear
        </Button>
        <Button onClick={this.randomize}>Randomize</Button>
      </div>
    );
  }
}

const Button = ({ children, ...props }) => (
  <span {...props} className={'Button ' + props.className}>
    {children}
  </span>
);

class Board extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    cellSize: 0
  };

  componentDidMount() {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight - 80; // remove the title and the buttons space
    const { rows, cols } = this.props.board;
    const sameDir = (screenWidth - screenHeight) * (cols - rows) > 0;

    this.setState({
      cellSize: Math.floor(
        (Math.min(screenWidth, screenHeight) /
          Math[sameDir ? 'min' : 'max'](cols, rows)) *
          0.8
      )
    });
  }

  handleClick(event) {
    const { addAliveCell, removeAliveCell } = this.props;
    const { row, column, alive } = event.target.dataset;

    if (alive === 'true') {
      removeAliveCell([+row, +column]);
    } else if (alive === 'false') {
      addAliveCell([+row, +column]);
    }

    this.forceUpdate();
  }

  render() {
    const { cells, generation } = this.props;
    const { cellSize } = this.state;

    return (
      <React.Fragment>
        <div className="Board" onClick={this.handleClick}>
          {Object.keys(cells).map(row => {
            return (
              <div key={row} className="Row">
                {Object.keys(cells[row]).map(col => {
                  let props = {
                    key: col,
                    row,
                    column: col,
                    cellSize,
                    alive: !cells ? false : cells[row][col].alive
                  };
                  return <Cell {...props} />;
                })}
              </div>
            );
          })}
        </div>
        <div className="Generation">Generation: {generation}</div>
      </React.Fragment>
    );
  }
}

class Cell extends Component {
  render() {
    const { row, column, cellSize, alive } = this.props;

    if (!cellSize) {
      return null;
    }

    return (
      <span
        data-row={row}
        data-column={column}
        data-alive={alive}
        className={'Cell' + (alive ? ' alive' : '')}
        style={{
          height: +cellSize + 'px',
          width: +cellSize + 'px'
        }}
      />
    );
  }
}

export default App;
