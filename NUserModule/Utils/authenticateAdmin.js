const authenticateAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const arr = authorization.split(' ');
        if (arr[0] === 'Bearer') {
            const token = arr[1];
            return jwt.verify(token, secret,"access", (err, payload) => {
                if (err) {
                    return res.status(401).send('Unauthenticated user');
                }
 
                req.user = payload;
                return next();
            });
         
        }
    }
 
    // throw new Error('Unauthenticated');
    return res.status(401).send('Unauthenticated user');
}
 
module.exports = authenticateAdmin;
