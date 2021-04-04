const { ObjectId } = require('mongodb')
const Game = require('../models/Game')
const Games = require('../models/Game')

module.exports.getAllGame = async (req, res) => {
  const games = await Games.find()
  res.status(200).json(games)
}
module.exports.getACctiveGame = async (req, res) => {
  const activeGame = await Games.find({active: true})
  res.status(200).json(activeGame)
}

module.exports.getSingleGame = async (req, res) => {
  const Game = await Games.findById(req.body.id)
  res.status(200).json(Game)
}

module.exports.add = async (req, res) => {
  
  const Game = {
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    minRate: req.body.minRate,
    maxRate: req.body.maxRate,
    active: req.body.active
  }

  const newGame = await Games.create(Game)
  res.status(201).json(newGame)
}
module.exports.update = async (req, res) => {
  const updateData = {
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    minRate: req.body.minRate,
    maxRate: req.body.maxRate,
    active: req.body.active
  }
  const game = await Game.findByIdAndUpdate(req.body.idGame, updateData)
  console.log(game);
}


module.exports.delete = async (req, res) => {
  await Games.findByIdAndRemove(req.body._id, (err, game) => {
    if (err){ 
      console.log(err) 
    } 
    else{ 
      console.log("Удаленно : ", game); 
    } 
  })
}