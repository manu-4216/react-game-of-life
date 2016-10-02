var React = require('react');
var Header = require('../components/Header');
var Content = require('../components/Content');
var Footer = require('../components/Footer');
require('../main.scss');

var App = function(props) {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
};

module.exports = App;
