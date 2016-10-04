var React = require('react');
require('../main.scss');
var classNames = require('classnames');

let Cell = ({ index, isAlive, size, onClick }) => {
  debugger;
  let classList = classNames({
    'cell': true,
    'cell__alive': isAlive
  });

  return (
    <span className={classList}
          onClick={onClick}
          style={size}>
      {index}
    </span>
  );
}

module.exports = Cell;
