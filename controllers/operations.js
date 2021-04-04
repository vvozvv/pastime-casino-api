const { ObjectId } = require('mongodb')
const { findByIdAndUpdate } = require('../models/Operations')
const Operations = require('../models/Operations')
const User = require('../models/User')


const createComment = function(tutorialId, comment) {
  return Operations.create(comment)
  .then(docComment => {
    return User.findByIdAndUpdate(
      tutorialId,
      { $push: { operations: docComment._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

module.exports.add = async (req, res) => {
  
  let up = {
    title: req.body.title,
    user_id: req.body.user_id,
    total: req.body.total,
    result: req.body.result
  }
  
  let userCoin = await User.findById(req.body.user_id).select('coin')
  console.log(req.body.result);
  let currentCoin = req.body.result ? userCoin.coin + req.body.total : userCoin.coin - req.body.total
  console.log(currentCoin);

  await User.findByIdAndUpdate(req.body.user_id,
    { $set: { coin: currentCoin }} ,
    { new: true, useFindAndModify: false }
  )
  // console.log(currentCoin);

  await createComment(req.body.user_id, up)
  
  res.status(201).json(currentCoin)
}

module.exports.getUserOperation = async (req, res) => {
  // console.log(req.);
  const userOperation = await User.findById(req.body.id).select('operations').populate("operations")
  console.log('lim 5');
  res.status(200).json(userOperation?.operations)
}

module.exports.getLastGames = async (req, res) => {
  const lastGame = await Operations.find({user_id: {$exists: true}}).sort('-date').limit(5).populate('user_id')
  res.status(200).json(lastGame)
}