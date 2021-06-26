const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const studentSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            require : true,
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
      }
);

module.exports = mongoose.model('student', studentSchema, 'student');