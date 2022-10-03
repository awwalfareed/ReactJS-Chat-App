const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        files: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },


    }, {
        timestamps: true
    }

)



userSchema.pre("save", async function(next) {

    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


//userSchema.methods.comparePassword = function(candidatePassword, cb) {
// bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) { return cb(err); }

//      cb(null, isMatch);
//   });
//};


const User = mongoose.model("User", userSchema)
module.exports = User;