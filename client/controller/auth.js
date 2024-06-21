// controllers/auth.js
const db = require('../model/db');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // 1) Check if the username and password exist
    if (!username || !password) {
        return res.status(400).render("client_login", {
            message: 'Please provide Username and Password'
        })
    }

    // 2) Check if user exists && password is correct
    db.query('SELECT * FROM client WHERE username = ?', [username], async (error, results) => {
        // Check if results is defined and not empty
        if (!results || results.length === 0) {
            return res.status(401).render("client_login", {
                message: 'Incorrect username or password'
            });
        }

        const isMatch = password === results[0].password;

        console.log('Entered Password:', password);
        console.log('Stored Password:', results[0].password);
        console.log('isMatch:', isMatch);

        if (!results || !isMatch) {
            return res.status(401).render("client_login", {
                message: 'Incorrect username or password'
            });
        } else {
            // 3) Session and Authentication
            // Set a flag in the session to indicate authentication
            req.session.authenticated = true;
            req.session.user = {
                username: results[0].username,
            };

            // Redirect to the dashboard
            res.redirect("/client_dashboard");
        }
    });
};

exports.isLoggedIn = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        return res.status(401).render("client_login", {
            message: 'You need to log in'
        });
    }
};

exports.logout = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Clear the session cookie
        res.clearCookie();

        // Redirect to the login page
        res.status(200).redirect("/client_login");
    });
};
