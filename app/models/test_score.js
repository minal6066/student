const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scoreSchema = new Schema(
    {
        userId : {
            type: Schema.ObjectId,
             ref: 'student' 
        },
        first_round : {
            type: Number,
            default : 0
        },
        second_round : {
            type: Number,
            default : 0
        },
        third_round : {
            type: Number,
            default : 0
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);
module.exports = mongoose.model('score', scoreSchema, 'score');
