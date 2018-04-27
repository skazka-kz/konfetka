const puppeteer = require("puppeteer");

/**
 * Class to create a puppeteer page for testing interaction with the page
 */
class CustomPage {
  static async build() {

    const settings = process.env.CI ? {
      headless: true,
      args: ['--no-sandbox']
    } : {
      headless: false,
      args: ['--no-sandbox']
    };
    const browser = await puppeteer.launch(settings);
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    // TODO: adapt to this project
    /*const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.goto("http://localhost:3000/blogs");
    await this.page.waitFor("a[href='/auth/logout'");*/
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async getImageSrc(selector){
    return this.page.$eval(selector, el => el.src);
  }

  async getDomElementProperty(selector, property){
    console.log(property);
    return this.page.$eval(selector, el => el[property]);
  }

  async getDomElement(selector){
    return this.page.$(selector);
  }
}

module.exports = CustomPage;