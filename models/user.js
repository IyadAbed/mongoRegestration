const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const SECRET = ''

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      lowercase: true,
      required: true
    },
    user_type: {
      type: String,
      required: true,
    },
    user_token:{
      type: String,
      // required: true,
    }
  },
  { timestamp: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.generateToken = function(Obj) {
//   const payload = {firstName: Obj.firstName, lastName: Obj.lastName}
//   const token = jwt.sign(payload,SECRET,Timeout_Token)
//   return(token)
// }

// userSchema.verifyToken = function (token){
//   jwt.verify(token, SECRET, async function(err, decoded){
//     if(err){
//       console.log('this token is invalid' + err);
//       return Promise.reject(err);
//     }
//     return decoded

//   })
// }

module.exports = mongoose.model("user", userSchema);
