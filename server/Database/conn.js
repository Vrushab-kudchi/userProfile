import mongoose from 'mongoose';
//mongodb://127.0.0.1:27017/UserProfile
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Vrushab:q95Mqmolaivq6vn1@cluster0.t4ubkuy.mongodb.net/UserProfile');
        console.log("Connected to the database");
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;
