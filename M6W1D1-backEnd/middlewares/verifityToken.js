const jwt = require('jsonwebtoken');

const EXCLUDED_ROUTES = [
    '/auth/login',
    '/users',
    '/login',
    '/auth'
    

];


const verifyToken = (req, res, next) => {

    if (EXCLUDED_ROUTES.includes(req.path))
        return next();

    const token = req.header('Authorization')

    if(!token){
        return res.status(401)
        .json({ error: 'Access denied. No token provided.' });
    }
    try {
        const sanitazerToken = token.replace('Bearer ', '');
        const decodedToken = jwt.verify(sanitazerToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
        
    } catch (error) {
        res.status(400)
        .json({ error: 'Invalid token.' });
        
    }
}

module.exports = verifyToken;