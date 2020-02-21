import mongoose from 'mongoose'

const {Schema} = mongoose

const itemSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    }
});

const items = mongoose.model('items', itemSchema);
export default items;