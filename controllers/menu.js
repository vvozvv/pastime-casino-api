const { ObjectId } = require('mongodb')
const Menu = require('../models/Menu')

module.exports.getActiveMenu = async (req, res) => {
  const activeMenu = await Menu.find({active: true})
  res.status(200).json(activeMenu)
}
module.exports.getAllMenu = async (req, res) => {
  const menu = await Menu.find()
  res.status(200).json(menu)
}

module.exports.addItemMenu = async (req, res) => {
  const itemMen = {
    title: req.body.title,
    url: req.body.url,
    active: req.body.active,
  }
  const newMenu = await Menu.create(itemMen)
  res.status(200).json(newMenu)
}

module.exports.changeitemMenu = async (req, res) => {
  await Menu.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    url: req.body.url,
    active: req.body.active,
  }, { new: true }, (err, model) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(model)
    }
  })  
}
module.exports.deleteItemMenu = async (req, res) => {
  console.log(req.body);
  await Menu.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        message: 'Удаленно!'
      })
    }
  })
}