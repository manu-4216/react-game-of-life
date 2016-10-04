var React = require('react');
var CellsGrid = require('../components/CellsGrid');
require('../main.scss');

var GameBoard = React.createClass({

  getInitialState: function () {
    return {
      aliveCells: [1, 3, 78]
    }
  },

  render: function () {
    return (
      <CellsGrid
        aliveCells={this.state.aliveCells}
        onClick={this.onClick}
      />
    );
  },


  onClick: (index) => {
       console.log('pressed: ' + index);
       const getNeighbors = (index, gameWidth, gameHeight) => {
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
       };

       const reversedCellState = (index, aliveCells) => {
         let updatedAliveCells = [];
         let positionOfIndexedCell = aliveCells.indexOf(index);
         // if alive, kill, by returning only the items that are different:
         if (positionOfIndexedCell >= 0) {
           updatedAliveCells = aliveCells.filter(item => (item !== index));
         } else {
           // If non existent, create cell:
           updatedAliveCells = aliveCells.concat(index);
           console.log("Added " + index);
         }

         // Return the new state:
         return updatedAliveCells;
       };

       getNeighbors(index, 50, 30);
       //reverseCellState.bind(null, index, aliveCells)();

       /*this.setState({
         aliveCells: reverseCellState(index, this.state.aliveCells)
       })*/
       //this.forceUpdate();
  }
  
});

module.exports = GameBoard;
