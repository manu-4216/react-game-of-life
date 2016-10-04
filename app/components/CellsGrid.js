var React = require('react');
require('../main.scss');
var classNames = require('classnames');
var Cell = require('../components/Cell');

let CellsGrid = ({ aliveCells, onClick }) => {
  // These 2 params will be fixed. They will be used to calculate the cell size:
  const gridWidth = 40;
  const gridHeight = 24;

  // This can (potentially) be variable. It's the cell density:
  let nrOfCellsPerRow = 10;

  // Other values will be then calculated:
  let nrOfCellsPerCol = gridHeight/gridWidth*nrOfCellsPerRow;
  let gridSize = {
    width: gridWidth + 'rem',
    height: gridHeight + 'rem'
  };

  let getItems = () => {
    let cells = [];
    let cellSize = {
      width: gridWidth/nrOfCellsPerRow + 'rem',
      height: gridWidth/nrOfCellsPerRow + 'rem'
    };
    //debugger;
    for (let i = 1; i < nrOfCellsPerRow*nrOfCellsPerCol + 1; i++) {
      cells.push(
        <Cell
          key={i}
          index={i}
          isAlive={(aliveCells.indexOf(i) >= 0)}
          size={cellSize}
          onClick={() => onClick(i)}
        />
      );
    }
    return cells;
  };

  return (
    <div className='game-board' style={gridSize}>
      <div className='div'>
        { getItems() }
      </div>
    </div>
  );
};

module.exports = CellsGrid;
