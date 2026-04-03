const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const shortid = require('shortid');

const register = async (req, res, { userModel }) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);
  const { email, password, name, surname } = req.body;

  // validate
  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().allow('').optional(),
  });

  const { error, value } = objectSchema.validate({ email, password, name, surname });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid registration data.',
      errorMessage: error.message,
    });
  }

  const existingUser = await User.findOne({ email: email, removed: false });

  if (existingUser)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'An account with this email already exists.',
    });

  const salt = shortid.generate();
  const hashedPassword = bcrypt.hashSync(salt + password);

  // Create new user
  const newUser = new User({
    email,
    name,
    surname: surname || '',
    enabled: true,
    role: 'owner',
  });
  
  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  const newUserPassword = new UserPassword({
    user: newUser._id,
    password: hashedPassword,
    salt,
    loggedSessions: [token],
  });

  await newUserPassword.save();

  return res.status(200).json({
    success: true,
    result: {
      _id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      email: newUser.email,
      photo: newUser.photo,
      token: token,
      maxAge: null,
    },
    message: 'Successfully registered user',
  });
};

module.exports = register;
