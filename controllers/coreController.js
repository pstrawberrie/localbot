const mongoose = require('mongoose');

//+ GET Index
exports.index = (req, res) => {

  res.render('index', {
    title: 'Top'
  });
}