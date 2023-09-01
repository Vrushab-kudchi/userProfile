import express from 'express';
import * as userController from '../Controller/userController.js';
import {registerMail} from '../Controller/Mailer.js'
import { Auth, localVaribles } from '../Middleware/Auth.js';

const router = express.Router();

// Post Method
router.post('/register', userController.register);
router.post('/registerMail', registerMail);
router.post('/authenticate', userController.verifyUser,(req, res) => res.end());
router.post('/login',userController.verifyUser, userController.login);
router.post('/encrypt', userController.encrypt);
router.post('/decrypt', userController.decrypt);

// Get Method
router.get('/user/:username', userController.getUser);
router.get('/generateOTP',userController.verifyUser ,localVaribles, userController.generateOTP);
router.get('/verifyOTP', userController.verifyUser,userController.verifyOTP);
router.get('/createResetSession', userController.verifyUser, userController.createResetSession);
router.get('/encryptionHistory', userController.getEncryptionHistory);

// Put Method
router.put('/updateuser',Auth, userController.updateUser);
router.put('/resetPassword', userController.resetPassword);

export default router;
