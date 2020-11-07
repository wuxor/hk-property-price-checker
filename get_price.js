const puppeteer = require('puppeteer')
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let propertyConfig = null;
let propertyConfigPath = path.normalize('config/hsbc.yaml');
try {
    propertyConfig = yaml.safeLoad(fs.readFileSync(propertyConfigPath));
    console.log(propertyConfig);
} catch (e) {
    console.log(e);
}

async function getPrice() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(propertyConfig['url']);
        await page.select('select[name="zone"]', propertyConfig['zone']);
        await page.select('select[name="district"]', propertyConfig['district']);
        await page.select('select[name="estate"]', propertyConfig['estate']);
        await page.select('select[name="block"]', propertyConfig['block']);
        await page.select('select[name="floor"]', propertyConfig['floor']);
        await page.select('select[name="flat"]', propertyConfig['flat']);
        await page.click('.search-button');
        await page.screenshot({ path: 'screenshot.png' });

        await browser.close();
    } catch (error) {
        console.error(error);
    }
}

getPrice();


