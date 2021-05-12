const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const Apify = require("apify");
const { log } = Apify.utils;

const oneNewsService = {
  readMore: async (newsId) => {
    const loginBrowser = await Apify.launchPuppeteer();
    const loginPage = await loginBrowser.newPage();
    await loginPage.goto("https://login.medscape.com/login/sso/getlogin");

    //   login

    const emailSelector =
      "#loginForm > div.mdscp-form-generator > div:nth-child(1) > div > div > input";
    const passwordSelector =
      "#loginForm > div.mdscp-form-generator > div:nth-child(2) > div > div > input";
    const submitSelector = "#loginForm > div.mdscp-button.reg-default > button";

    await loginPage.type(emailSelector, "dr.ekwealor@yahoo.com");
    await loginPage.type(passwordSelector, "obinna30");
    await loginPage.click(submitSelector);
    await loginPage.setDefaultNavigationTimeout(0);

    // get cookies
    const cookies = await loginPage.cookies();

    // ----Use cookies in another tab or browser

    const siteUrl = `https://www.medscape.com/viewarticle/${newsId}`;

    async function configureBrowser() {
        // const browser = await Apify.launchPuppeteer();

        const page = await loginBrowser.newPage();
      await page.setDefaultNavigationTimeout(0);
    //   await page.setCookie({ ...cookies });
      await page.goto(siteUrl);

      return page;
    }

    async function checkContent(page) {
      await page.reload();
      // get page in html
      const content = await page.content();
      // load content in cheerio
      const $ = cheerio.load(content);

      const titleSelector = "#column-left > div.title-area > div.heading > h1";
      const authorSelector =
        "#column-left > div.title-area > div.meta > p.meta-author > a";
      const dateSelector =
        "#column-left > div.title-area > div.meta > p.meta-date";

      $(titleSelector).each((idx, elem) => {
        const title = $(elem).text();

        console.log(title);
      });
      $(authorSelector).each((idx, elem) => {
        const author = $(elem).text();

        console.log(author);
      });

      $(dateSelector).each((idx, elem) => {
        const date = $(elem).text();

        console.log(date);
      });

      //   const result = links.map((link, index) => {
      //     return {
      //       id: link.substring(31),
      //       link: link,
      //       title: titles[index],
      //       teaser: teasers[index],
      //     };
      //   });
    }

    async function monitor() {
      let page = await configureBrowser();
      await checkContent(page);
    }
    monitor();
  },
};

module.exports = oneNewsService;
