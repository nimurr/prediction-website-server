const httpStatus = require("http-status");
const { User, PokerTournament, PricePrediction, ScorePrediction } = require("../models");
const ApiError = require("../utils/ApiError");
const { sendEmailVerification } = require("./email.service");
const unlinkImages = require("../common/unlinkImage");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const oneTimeCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  if (userBody.role === "user" || userBody.role === "admin") {

    sendEmailVerification(userBody.email, oneTimeCode);
  }
  return User.create({ ...userBody, oneTimeCode });
};


const queryUsers = async (filter, options) => {
  const query = {};

  // ✅ Enforce role = "user" no matter what
  query.role = "user";

  // Apply other filters
  if (filter.fullName) {
    query.fullName = { $regex: filter.fullName, $options: "i" };
  }

  if (filter.email) {
    query.email = { $regex: filter.email, $options: "i" };
  }

  if (filter.username) {
    query.username = { $regex: filter.username, $options: "i" };
  }

  if (filter.gender) {
    query.gender = filter.gender;
  }

  // Use pagination
  const users = await User.paginate(query, options);
  return users;
};



const getUserById = async (id) => {
  return User.findById(id).select('+password +securitySettings +fcmToken +isResetPassword +oneTimeCode +isEmailVerified +isDeleted +isBlocked');
};


const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody, files) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  if (files && files.length > 0) {
    updateBody.photo = files;
  } else {
    delete updateBody.photo; // remove the photo property from the updateBody if no new photo is provided
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const isUpdateUser = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const oneTimeCode =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  if (updateBody.role === "user" || updateBody.role === "admin") {
    sendEmailVerification(updateBody.email, oneTimeCode);
  }

  Object.assign(user, updateBody, {
    isDeleted: false,
    isSuspended: false,
    isEmailVerified: false,
    isResetPassword: false,
    isPhoneNumberVerified: false,
    oneTimeCode: oneTimeCode,
  });
  await user.save();
  return user;
};


const getDashboardStatus = async () => {
  const totalUsers = await User.countDocuments({ isDeleted: false, role: "user" });
  const totalPoker = await PokerTournament.countDocuments();
  const totalPricePredictions = await PricePrediction.countDocuments(); // Placeholder, replace with actual logic if needed
  const totalScorePredictions = await ScorePrediction.countDocuments(); // Placeholder, replace with actual logic if needed

  // daily new users & last 30 days
  const usersActivity = await User.aggregate([
    {
      $match: { isDeleted: false, role: "user" },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
    },
    { $limit: 30 },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day",
          },
        },
        count: 1,
      },
    },
    { $sort: { date: 1 } },
  ]);

  // resent 10 users 
  const recentUsers = await User.find({ isDeleted: false, role: "user" })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("fullName email role createdAt");

  const totalEvents = totalPoker + totalPricePredictions + totalScorePredictions;
  const all = {
    totalUsers,
    totalEvents,
    usersActivity,
    recentUsers,
  }

  return all;
};

const blockUser = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  let message = '';
  if (user.isBlocked) {
    user.isBlocked = false;
    await user.save();
    message = 'User unblocked successfully';
  } else {
    user.isBlocked = true;
    await user.save();
    message = 'User blocked successfully';
  }


  return { user, message };
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isUpdateUser,
  getDashboardStatus,
  blockUser
};