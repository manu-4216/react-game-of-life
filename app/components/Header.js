var React = require('react');
require('../main.scss');

var Header = function(props) {
  return (
    <div className='header'>
      <a href='https://www.math.cornell.edu/~lipa/mec/lesson6.html' target='_blank'>ReactJS Game of Life</a>
    </div>
  )
};

module.exports = Header;
