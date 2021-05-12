const db = require("../models");
const { NewsUpdate } = db;

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

const newsUpdateService = {
  createArticle: async ({
    title,
    article,
    author,
    articleReference,
    UserId,
  }) => {
    const result = await NewsUpdate.create({
      title,
      article,
      author,
      articleReference,
      UserId,
    });

    return result;
  },

  getNews: async () => {
    const siteUrl = "https://www.sciencedaily.com/news/top/health";

    async function configureBrowser() {
      const browser = await puppeteer.launch({ headless: false });

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(siteUrl);

      return page;
    }

    async function checkContent(page) {
      await page.reload();
      // let html = await page.evaluate(() => document.body.innerHTML);
      // console.log(html);

      // get page in html
      const content = await page.content();

      // load content in cheerio

      const $ = cheerio.load(content);

      const links = [];
      const titles = [];
      const teasers = [];

      $(".latest-head").each((idx, elem) => {
        const link = $(elem).find("a").attr("href");
        const title = $(elem).text();

        links.push(link);
        titles.push(title);
      });

      $(".latest-summary").each((idx, elem) => {
        const teaser = $(elem)
          .text()
          .replace(/[\n\t\r]/g, "");

        teasers.push(teaser);
      });

      const result = links.map((link, index) => {
        return {
          id: link.substring(18, 30),
          link: link,
          title: titles[index],
          teaser: teasers[index],
        };
      });

      return result;
    }

    async function monitor() {
      let page = await configureBrowser();
      await checkContent(page);
    }
    monitor();
  },

  readMore: async ({ newsId, day, month }) => {
    const siteUrl = `https://www.sciencedaily.com/releases/${month}/${day}/${newsId}.htm`;

    async function configureBrowser() {
      const browser = await puppeteer.launch({ headless: false });

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(siteUrl);

      return page;
    }

    async function checkContent(page) {
      await page.reload();
      // let html = await page.evaluate(() => document.body.innerHTML);
      // console.log(html);

      // get page in html
      const content = await page.content();

      // load content in cheerio

      const $ = cheerio.load(content);

      const result = [];

      $("#headline").each((idx, elem) => {
        const title = $(elem).text();
        result.push(title);
      });
      $("#date_posted").each((idx, elem) => {
        const date = $(elem).text();
        result.push(date);
      });
      $("#first").each((idx, elem) => {
        const lead = $(elem).text();
        result.push(lead);
      });
      $("#text").each((idx, elem) => {
        const text = $(elem).text();
        result.push(text);
      });

      const mainResult = [
        {
          tittle: result[0],
          date: result[1],
          lead: result[2],
          text: result[4],
        },
      ];
      console.log(mainResult);
    }

    async function monitor() {
      let page = await configureBrowser();
      await checkContent(page);
    }
    monitor();
  },
};
module.exports = newsUpdateService;
