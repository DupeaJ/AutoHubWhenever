const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');

// Login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a session for the logged-in user
        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = user.name;

        req.session.save(() => {
            res.status(200).json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
