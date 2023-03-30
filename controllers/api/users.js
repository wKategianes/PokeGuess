const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken,
  updateScore,
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
  const { userId, score } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Get the current score array
    const scoreArray = user.score;

    // If there is no score object in the array, add one with the current score
    if (scoreArray.length === 0) {
      scoreArray.push({ value: score });
    } else {
      // If there is a score object in the array, update it with the current score
      scoreArray[0].value = Math.max(scoreArray[0].value, score);
    }

    // Update the score array in the user model
    user.score = scoreArray;
    await user.save();

    return res.status(200).send(user);

  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
}


