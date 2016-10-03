var React = require('react');
require('../main.scss');

var Footer = function(props) {
  return (
    <div className='footer'>
      Feel free to add cells while it's running. The cells in light red are younger, dark red are older. Enjoy!
    </div>
  )
};

module.exports = Footer;
