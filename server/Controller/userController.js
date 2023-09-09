import userModel from '../Model/User.model.js';
import userHistoryModel from '../Model/userHistory.model.js';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import CryptoJS from 'crypto-js';


//Middleware to Verify username
export const verifyUser = async (req, res, next) => {
    try {
        const username = req.method === "GET" ? req.query.username : req.body.username;
        const existUser = await userModel.findOne({ username });

        if (existUser) {
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(404).send({ error: "Invalid Username" });
        }
    } catch (error) {
        res.status(500).send({ error: "Authentication Error" });
    }
};


// POST {
//   "username":"vrushab",
//   "email": "kudchivrushab@gmail.com",
//   "password": "@mynameisVr123",
//   "secret_key": "this is top secret",
//   "profile": ""
// }
export const register = async (req, res) => {
    try {
        const { username, email, password, profile, secret_key } = req.body;

        // Check if username already exists
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check if email already exists
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
            secret_key
        });

        // Save the user
        const savedUser = await newUser.save();
        return res.status(201).send({ msg: "User has been created" });

    } catch (error) {
        return res.status(500).send({ error: "An error occurred" });
    }
};


//POST {
//   "username": "vrushab",
//   "password": "@mynameisVr123"
// }
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (isPasswordCorrect) {
                // Implement JWT generation
                const token =jwt.sign({ userId: existingUser._id , username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: "2h" }, );
                return res.status(201).send({
                    msg: "Logged in successfully",
                    username: existingUser.username,
                    token
                });
            } else {
                return res.status(401).send({ error: "Incorrect Password" });
            }
        } else {
            return res.status(404).send({ error: "Username Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ error: "An error occurred" });
    }
};


//GET USER DATA
export const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" }); // Use 400 for bad request
        }

        const user = await userModel.findOne({ username }).select('-password');
        if (!user) {
            return res.status(404).send({ error: "No User Found" });
        }

        return res.status(201).send({ user });
    } catch (error) {
        return res.status(500).send({ error: "There was a problem fetching user" });
    }
};


// POST Encrypted
// {
//   "_id": "64dfc671a21386a4c99318ba",
//   "plainText": "This is Hidden Text you Cant find it hahahha"
// }
export const encrypt = async (req, res) => {
    try
    {
        const { _id, plainText } = req.body;
        const { secret_key } = await userModel.findOne({ _id });
        var encryptedText = CryptoJS.AES.encrypt(plainText, secret_key).toString();
        const newUserHistory = new userHistoryModel({
            userId: _id,
            plainText,
            secret_key,
            encryptedText
        });
        newUserHistory.save() ?
            res.status(201).send({ msg: "Encryption has been Stored in database", encryptedText }) :
            res.status(402).send({error: "there was a problem while Storing in Database"})
    }
    catch (error)
    {
        return res.status(500).send({error: "There was a problem with the Server"})
    }
}

//POST Decrypt
// {
//   "secret_key":"8923748923",
//   "encryptedText":"U2FsdGVkX1/hs696pF+mxni/roVB/Xb768fdWHxkvLTxnDsFooghMnxcmLYZwc/mdXTsajFwxVVYJpigG2mtpg=="
// }
export const decrypt = async (req, res) => {
    try
    {
        const { encryptedText, secret_key } = req.body;
        const bytes  = CryptoJS.AES.decrypt(encryptedText, secret_key);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
           if (plainText) {
                res.status(201).send({ plainText });
           } else {
                res.status(400).send({ error: "Invalid secret key or encrypted text" });
           }
           }
        catch (error)
        {
            return res.status(500).send({ error: "There was a problem with the server" });
        }

}


// GET generateOTP
export const generateOTP = async (req, res) => {
        req.app.locals.OTP = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        res.status(201).send({ Code: req.app.locals.OTP });
        console.log(req.app.locals.OTP);
}

//GET verifyOTP
export const verifyOTP = (req, res) => {
    const { code } = req.query;

    if (parseInt(code) === parseInt(req.app.locals.OTP)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        res.status(201).send({ msg: "OTP Verified" });
    } else {
        res.status(401).send({ error: "Verification Failed" });
    }
};

//GET CreateResetSession
export const createResetSession = (req, res) => {
    if (req.app.locals.resetSession)
    {
        req.app.locals.resetSession = false;
        return res.status(201).send({ Flag: req.app.locals.resetSession });
    }
    return res.status(440).send({error: "Session Expired"})
}

//GET User Encryption History
export const getEncryptionHistory = async (req, res) => {
    try
    {
        const { userId } = req.query;
        const data = await userHistoryModel.find({ userId }).select('-userId');
        res.send(data);
    }
    catch (error)
    {
        return res.status(500).send({ error: "Server Error Failed to find ur History" });
    }
}



//PUT UPDATE USER DATA
export const updateUser = async (req, res) => {
    try {
        // const { id } = req.query;
        const { userId } = req.user;
        if (userId) {
            await userModel.updateOne({ _id: userId }, req.body);

            res.status(200).send({ msg: "User has been updated" });
        } else {
            res.status(401).send({ error: "User not Found" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


//PUT ResetPassword
export const resetPassword = async (req, res) => {
    try
    {
        const { username, password } = req.body;
        if(!req.app.locals.resetSession) { return res.status(440).send({error: "Session Expired"})}
        const hashedpassword = await bcrypt.hash(password, 10);
        await userModel.updateOne({ username }, { password: hashedpassword });
        req.app.locals.resetSession = false;
        res.status(201).send({"msg": "Password is Changed"})
    }
    catch (error)
    {
        res.status(401).send({error})
    }
}

//Delete Single History
export const deleteHistory = async (req, res) => {
    try
    {
        const { _id } = req.query;
        await userHistoryModel.deleteOne({ _id });
        res.status(200).send({ msg: "Deleted Successfully" });
    }
    catch
    {
        res.status(500).send({ error: "There was an error While Deleting" });
    }
}
