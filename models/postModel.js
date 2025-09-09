import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    author:{
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    content: {
        type: String,
        required: true,
        minlength: 3
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleString()
    }
});

export default mongoose.model("Post", postSchema);