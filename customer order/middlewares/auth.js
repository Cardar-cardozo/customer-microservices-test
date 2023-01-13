const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    //Get Token fron header
    const token = req.header('x-auth-token');

    //Check if token
    if (!token) {
        return res.status(401).json({ msg: 'unauthorized' });
    }

    //Decode token if valid
    try {
        const userDetails = JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString(),
          );
          console.log(userDetails)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;

        next();

    } catch (error) {
        res.status(401).json({ msg: error.message });

    }

}