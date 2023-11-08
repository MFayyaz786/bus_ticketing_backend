const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required!'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'PhoneNumber is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user','agent','driver'],
      default: 'user',
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: true, // * for testing
    },
    // emailVerificationCode: String,
    phoneVerificationCode: String,
    activationCode: String,
    passwordResetCode: String,
    passwordResetExpires: Date,
    // isSocialLogin: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Encrpt the password ad Presave it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //  only run if password is modified
    return next();
  }
  
  this.password = await bcrypt.hash(this.password, 12); // hashing password
  this.passwordConfirm = undefined; // delete passwordConfirm field
  next();
});

userSchema.methods.createAccountActivationLink = function () {
  const activationToken = crypto.randomBytes(32).toString('hex');
  // console.log(activationToken);
  this.activationLink = crypto
    .createHash('sha256')
    .update(activationToken)
    .digest('hex');
  // console.log({ activationToken }, this.activationLink);
  return activationToken;
};

userSchema.methods.createAccountActivationCode = function (){
  // Generate a random buffer using the crypto.randomBytes function
  const buf = crypto.randomBytes(3);
  // Convert the buffer to an integer and take the modulus to get a number between 100000 and 999999
  let code= buf.readUIntBE(0, 3) % 1000000;
  // Return the code as a string, padded with leading zeros if necessary
  code = code.toString().padStart(6, '0');
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  this.activationCode=hash
  return code;
};
// comparing password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  console.log(resetToken);
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
