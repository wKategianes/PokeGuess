const User = require('../models/user');

// Define the updateScore controller function
function updateScore(req, res) {
    try {
        const userId = req.user.id; // Get the user's ID from the request object
        const newScore = req.body.score; // Get the new score from the request body

        // Find the user by ID and update their score
        const user = await User.findByIdAndUpdate(userId, { score: newScore });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user object
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
