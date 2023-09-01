import mongoose from "mongoose";
import { Schema } from "mongoose";

const userHistorySchema = new Schema({
    plainText: {
        type: String,
        required: true
    },
    secret_key: {
        type: String,
        required: true
    },
    encryptedText: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model.userHistory || mongoose.model('userHistory', userHistorySchema);
