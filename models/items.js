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
});

const items = mongoose.model('items', itemSchema);
export default items;