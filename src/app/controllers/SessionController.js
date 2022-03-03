const { User } = require("../models");

class SessionController {
  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * */
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      }
    });

    if (!user)  {
      return res.status(400).json({ error: 'invalid credentials' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'invalid credentials' });
    }
    const token = user.generateJWT();

    return res.json({ user, token });
  }
}

module.exports = new SessionController();
