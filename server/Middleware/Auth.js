import  jwt  from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error)
    {
        res.status(401).send({error: "Authentication Failed"})
    }
}

export const localVaribles = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}
