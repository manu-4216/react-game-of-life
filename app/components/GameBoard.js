var React = require('react');
require('../main.scss');

var GameBoard = function(props) {

  var size = {
    width: '40rem',
    height: '25rem'
  };

  return (
    <div className="game-board" style={size}>
      GameBoard
    </div>
  )
};

module.exports = GameBoard;
