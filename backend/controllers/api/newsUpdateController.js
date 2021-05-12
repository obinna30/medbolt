const newsUpdateService = require("../../services/newsUpdateService");

const newsUpdateController = {
  createArticle: async (req, res) => {
    const { UserId } = req.params;
    const { title, article, author, articleReference } = req.body;

    try {
      const result = await newsUpdateService.createArticle({
        title,
        article,
        author,
        articleReference,
        UserId,
      });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getNews: async (req, res) => {
    try {
      const result = await newsUpdateService.getNews();

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  readMore: async (req, res) => {
    const { month, day, newsId } = req.params;
    try {
      const result = await newsUpdateService.readMore({month, day, newsId});
      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
};
module.exports = newsUpdateController;
