const authService = require('./auth.service');

const login = async (req, res) => {
    try {
        
        const {token}= await authService.login(req.body);
        res.status(200)
        .send({
            statuscode: 200,
            message: 'Login successful',
            token
        })
    } catch (error) {
        console.log('Login error:', error);
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
login
}