import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide Unique Username"],
        unique: [true,"username Exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide your Password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please provide your Email"],
        unique: [true,"email Already Exists"]
    },
    profile: {
         type: String
    },
    secret_key: {
        type :String
    }

});

export default  mongoose.models.User || mongoose.model('User', userSchema);
