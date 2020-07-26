const mongoose = require('mongoose'); // for later... does it creates another instance? why can't I call ../database?
const bcrypt = require ('bcrypt');

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true, 
        },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        },
    password: {
        type: String,
        required: true,
        select: false,
        },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

