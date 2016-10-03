var React = require('react');
var Button = require('../components/Button');
var GameBoard = require('../components/GameBoard');
require('../main.scss');

var Content = function(props) {
  var genNr = 0;
  return (
    <div className='content'>
      <div className='game-top'>
        <Button>Run</Button>
        <Button>Pause</Button>
        <Button>Clear</Button>
        <span>Generation: {genNr}</span>
      </div>

      <GameBoard />

      <div className='game-bottom'>
        <div>Board Size:<Button>50x30</Button><Button>70x50</Button><Button>100x80</Button></div>
        <div>Sim Speed:<Button>Slow</Button><Button>Medium</Button><Button>Fast</Button></div>
      </div>

    </div>
  )
};

module.exports = Content;
