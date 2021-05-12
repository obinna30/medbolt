const db = require("../models");
const { User, UserDetail, Department } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = {
  signUp: async ({
    firstName,
    lastName,
    userName,
    email,
    password,
    department,
    address,
    phoneNumber,
    state,
    country,
  }) => {
    const salt = bcrypt.genSaltSync(10);

    const newUser = await User.create(
      {
        userName: userName,
        email: email,
        password: bcrypt.hashSync(password, salt),
        Department: { department: department },
        UserDetail: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: phoneNumber,
          state: state,
          country: country,
        },
      },
      {
        include: [{ model: UserDetail }, { model: Department }],
      }
    );
    return newUser;
  },

  signIn: async (email, password) => {
    const user = await User.findOne({ where: { email: email } });

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        status: "error",
        message: "SignIn error",
      };
    }

    const payload = user.dataValues;
    const token = jwt.sign(payload, "obinna_secret", { expiresIn: "1h" });
    return {
      status: "success",
      message: "ok",
      token,
      user,
    };
  },
  updateUser: async ({
    firstName,
    lastName,
    userName,
    email,
    department,
    address,
    phoneNumber,
    state,
    country,
    UserId,
  }) => {
    const updatePromises = [];

    const updateUser = await User.update(
      { userName, email },
      { where: { id: UserId } }
    );
    const updateDepartment = await Department.update(
      { department },
      { where: { UserId } }
    );
    const updateUserDetail = await UserDetail.update(
      { firstName, lastName, address, phoneNumber, state, country },
      { where: { UserId } }
    );

    updatePromises.push(updateUser);
    updatePromises.push(updateDepartment);
    updatePromises.push(updateUserDetail);

    const result = await Promise.all(updatePromises);

    return result;
    
  },
};

module.exports = userService;
