const { default: mongoose } = require("mongoose");
var crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    // id:String,
    username: String,
    email: String,
    phone: String,
    place: String,
    hash: String,
    salt: String,
    status: Number,
  },
  { timestamps: true, }
);

UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

const Users = mongoose.model("users", UserSchema);
module.exports = { Users };