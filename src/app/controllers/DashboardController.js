class DashboardController {
  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * */
  render(req, res) {
    const teste = req.cookies;
    console.log(teste)
  }
}

module.exports = new DashboardController();
