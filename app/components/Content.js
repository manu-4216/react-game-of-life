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
        <Button>NEXT</Button>
        <span>Generation: {genNr}</span>
      </div>

      <GameBoard />

      <div className='game-bottom'>
        <div>Cell size:<Button>Small</Button><Button>Medium</Button><Button>Big</Button></div>
        <div>Sim Speed:<Button>Slow</Button><Button>Medium</Button><Button>Fast</Button></div>
      </div>

    </div>
  )
};

module.exports = Content;
