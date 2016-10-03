var React = require('react');
require('../main.scss');

var GameBoard = function(props) {

  var size = {
    width: '40rem',
    height: '24rem'
  };

  function getItems() {
    let cells = [];
    for (let i = 1; i < 50*30 + 1; i++) {
        cells.push(<span className='cell'
                          key={i}
                          onClick={() => {
                            console.log('pressed: ' + i);
                            getNeighbors(i, 50, 30);
                          }}>
                          {i}
                  </span>);
      }
    return cells;
  }

  function getNeighbors(index, gameWidth, gameHeight) {
    let neighbors = [];
    let checkedPosition;
    // Find the neighbor on top-left:
    checkedPosition = (index - gameWidth - 1);
    if (checkedPosition > 0 && (checkedPosition%gameWidth !== 0)) {
      neighbors.push(checkedPosition);
    }
    // Find the neighbor right on top:
    checkedPosition = (index - gameWidth);
    if (checkedPosition > 0) {
      neighbors.push(checkedPosition);
    }
    // Find the neighbor on top-right:
    checkedPosition = (index - gameWidth + 1);
    if ((checkedPosition > 0) && (index%gameWidth !== 0)) {
      neighbors.push(checkedPosition);
    }

    // Find the neighbor on the left: --------------------------------------
    checkedPosition = (index - 1);
    if (checkedPosition > 0 && (checkedPosition%gameWidth !== 0)) {
      neighbors.push(checkedPosition);
    }
    // Find the neighbor on the right:
    checkedPosition = (index + 1);
    if (index%gameWidth !== 0) {
      neighbors.push(checkedPosition);
    }

    // Find the neighbor on bottom-left: -----------------------------------
    checkedPosition = (index + gameWidth - 1);
    if ((checkedPosition < gameWidth * gameHeight) && (checkedPosition%gameWidth !== 0)) {
      neighbors.push(checkedPosition);
    }
    // Find the neighbor right on bottom:
    checkedPosition = (index + gameWidth);
    if (checkedPosition <= gameWidth * gameHeight) {
      neighbors.push(checkedPosition);
    }
    // Find the neighbor on bottom-right:
    checkedPosition = (index + gameWidth + 1);
    if ((checkedPosition <= gameWidth * gameHeight) && (index%gameWidth !== 0)) {
      neighbors.push(checkedPosition);
    }

    console.log("n="+neighbors);
    return neighbors;
  }

  return (
    <div className='game-board' style={size}>
      <div className='div'>
        { getItems() }
      </div>
    </div>
  )
};

module.exports = GameBoard;
