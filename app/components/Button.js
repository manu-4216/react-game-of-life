var React = require('react');
require('../main.scss');

var Button = function(props) {
  return (
    <div className='button'>
      {props.children}
    </div>
  )
};

module.exports = Button;
