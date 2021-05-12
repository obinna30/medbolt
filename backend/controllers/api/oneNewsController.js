const oneNewsService = require("../../services/oneNewsService");

const oneNewsController = {
  readMore: async (req, res) => {
    const { newsId } = req.params;
    try {
      const result = await oneNewsService.readMore(newsId);
      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = oneNewsController;
