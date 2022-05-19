import mongoose from "mongoose";
const {Schema,Types, model } = mongoose


const schema = new Schema({
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require:true
    },
    links:[{
        type: Types.ObjectId,
        ref: 'Link'
    }],

})

const User = model('User', schema)
export default User