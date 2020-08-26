const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    username: {                 // userStamp of the item, i.e. who created the item
        type: String,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;