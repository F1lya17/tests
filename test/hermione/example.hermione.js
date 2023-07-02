const { assert } = require('chai');

describe('общие требование', async function () {
    it('адаптация сайта', async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.setWindowSize(1420, 1080);
        await page.goto('http://localhost:3000/hw/store');
        await page.waitForSelector("body", { timeout: 5000 });
        await browser.assertView("site", "body");
        await browser.setWindowSize(1024, 1080);
        await browser.assertView("site2", "body");
        await browser.setWindowSize(768, 1080);
        await browser.assertView("site3", "body");
        await browser.setWindowSize(575, 1080);
        await browser.assertView("site4", "body");
        await browser.setWindowSize(320, 1080);
        await browser.assertView("site5", "body");
    });

    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.setWindowSize(575, 1080);
        await page.goto('http://localhost:3000/hw/store');
        await page.waitForSelector(".navbar", { timeout: 5000 });
        await browser.assertView("site6", "body");
        const burger = await browser.$('.navbar-toggler');
        console.log(burger);
        await burger.click();
        const link = await browser.$('.nav-link');
        await link.click();
        await browser.assertView("burger", ".navbar-toggler");
    });
});