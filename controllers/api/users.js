const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken,
  updateScore,
  getAllUsers,
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create({
      ...req.body,
      score: [{ value: 0 }]
    });
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json({ err: 'Invalid login credentials' });
  }
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function updateScore(req, res) {
const user = await User.findOne({_id: req.params.id});
let userScore = user.score[0];
userScore.value = req.body.score;
await user.save();
console.log(user, "This is the user inside of the updateScore controller function");
res.json(user);
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ name: 1, "score.value": -1 });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}



