import axios from 'axios';
import jwt_decode from "jwt-decode";

// DEfault URL
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// API REQUESTS


//GET Username By Tokken
 export const getUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) return { error: "Cannot Find Tokken" };
    let decode = jwt_decode(token);
    return decode;
 }


// Authentication Function
export const authenticate = async (username) => {
    try
    {
        return await axios.post('/api/authenticate' ,{username})
    }
    catch (error)
    {
        return {error: "User Doesn't Exists"}
    }
}

// Get User Details
export const getUser = async ({username}) => {
    try
    {
         return await axios.get(`/api/user/${username}`)

    }
    catch (error)
    {
        return {error: "password Does not Match"}
    }
}

// Register New User
export const register = async (Credential) => {
    try
    {
        const { data: { msg }, status } = await axios.post('/api/register', Credential);
        let { username, email } = Credential;

        // Send Registration Email
        if (status === 201)
        {
            await axios.post('/api/registerMail',{ username, userEmail: email, text: msg})
        }
        return msg;
    }
    catch (error)
    {
        return {error}
    }
}

// Login
export const login = async ({ username, password }) => {
    try
    {
        const { data } = await axios.post('/api/login', { username, password })
        return data;
    }
    catch (error)
    {
        return {error}
    }
}

// Update User
export const updateUser = async (response) => {
    try
    {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('/api/updateuser', response, { headers: { Authorization: `Bearer ${token}` } })
        return data;
    }
    catch (error)
    {
        return { error: "Updating User Failed" };
    }
}

// Generate OTP
export const generateOTP = async (username) => {
    try
    {
        const data = await axios.get('/api/generateOTP', { params: { username } })
        const status = data.status;
        const code = data.data.Code
        console.log(status,code);
       if (status === 201)
        {
            let user = await getUser({username});
            const email = user.data.user.email;
            let text = `Your Password Reset OTP is ${code} Verify and Recover Your Password`;
            await axios.post(`/api/registerMail` ,{username , userEmail: email, text, subject: "Password Recovery OTP"})
       }
        return code;
    }
    catch (error)
    {
        return { error: "Failed To Generate OTP" };
    }
}

// Verify OTP
export const verifyOTP = async ({username, code}) => {
    try
    {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return {data, status}
    }
    catch(error)
    {
        return { error };
    }

}

//Reset Password
export const resetPassword = async ({username, password}) => {
    try
    {
        const { data, status } = await axios.put('/api/resetPassword', { username, password })
        return {data,status}
    }
    catch (error)
    {
        return {error}
    }
}


//Encrypt and store in database
export const encrypt = async ({_id,plainText}) => {
    try
    {
        const data = await axios.post('/api/encrypt' , {_id, plainText});
        return data;
    }
    catch (error)
    {
        return { error };
    }
}


//Decrypt the EnccryptedText
export const decrypt = async ({encryptedText, secret_key}) => {
    try
    {
        return await axios.post('/api/decrypt', { encryptedText, secret_key });

    }
    catch (error)
    {
        return {error}
    }
}

// get Encryption History
export const history = async (userId) => {
    try
    {
        return await axios.get('/api/encryptionHistory', { params: {userId} });
    }
    catch (error)
    {
        return { error };
    }
}
