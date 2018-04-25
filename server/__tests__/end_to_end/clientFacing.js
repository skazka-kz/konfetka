const app = require("../../../server/app");
const CustomPage = require("../../../tests/CustomPage");

let url;
let server;

beforeAll(() => {
  // React should be built already, start the prod express server, launch puppeteer and go to the homepage
  const PORT = process.env.PORT || 5005;
  server = app.listen(PORT, () => {
    url = `http://localhost:${PORT}`;
  });
});

describe("Basic landing page interactions", () => {
  let page;

  beforeEach(async () => {
    page = await CustomPage.build();
    await page.goto(url);
  });
  afterEach(async () => {
    // await page.close();
  });

  it("Can see the logo", async () => {
    const logoImage = await page.getDomElement("header img");
    console.log(logoImage);
    expect(logoImage).toBeTruthy();
  });
});

afterAll(() => {
  server.close();
});
