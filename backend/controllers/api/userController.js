const userService = require("../../services/userService");

const userController = {
  signUp: async (req, res) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordCheck,
      department,
      address,
      phoneNumber,
      state,
      country,
    } = req.body;
    if (password !== passwordCheck) {
      return res.json({
        status: "error",
        message: "password does not match",
      });
    }
    try {
      const result = await userService.signUp({
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
      });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "Signup error",
        message: "User not created",
      });
    }
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userService.signIn(email, password);

      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    const { UserId } = req.params;
    console.log(UserId);
    const {
      firstName,
      lastName,
      userName,
      email,
      department,
      address,
      phoneNumber,
      state,
      country,
    } = req.body;

    try {
      const result = await userService.updateUser({
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
      });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "update user error",
        message: "User not Updated",
      });
    }
  },
};

module.exports = userController;
