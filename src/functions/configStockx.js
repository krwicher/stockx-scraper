const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./configRequest');
const algoliasearch = require("algoliasearch");

let algoliaKey = ""

module.exports = {
    getAlgoliaKey: async () => {
        if (algoliaKey === "" || algoliaKey.expiryDate < Date.now() - 10000) {
        // scrape homepage
        const html = await axios.get('https://stockx.com', config.searchAndGetProduct()).then(res => res.data);
        const $ = cheerio.load(html, { xmlMode: false });
    
        // extract algolia key from scripts
        const scripts = $('script').get();
        const key = scripts[1].children[0].data.split('\'')[1]

        // connect algolia client
        const client = algoliasearch("XW7SBCT9V6", key);

        // calculate end of validity time
        const date = Date.now()
        const validity = await client.getSecuredApiKeyRemainingValidity(key)
        const expiryDate = date + validity * 1000;

        algoliaKey = {
            key: key,
            expiryDate: expiryDate
        }
        return algoliaKey.key
        }
        return algoliaKey.key
    },
    currencys: ["EUR", "USD", "AUD", "CHF", "CAD", "GBP", "HKD", "JPY"],
    countrys: [
        "AD", "AE", "BE", "SK", "SN", "SV", "TC", "TH", "TW", "UY", "VA", "VE", "VI", "BG", "VN", "ZA", "IT", "PT",
        "CA", "FR", "GB", "GG", "JE", "ES", "BS", "US", "IN", "BM", "BR", "BS", "BW", "BZ", "CH", "CL", "AG", "CN",
        "CO", "CR", "CY", "CZ", "DE", "DK", "DM", "DO", "DZ", "AL", "EC", "EE", "FI", "FJ", "FO", "GD", "GE", "GF", "GI", "GL", "AR", "GP",
        "GR", "GT", "GU", "HK", "HN", "HR", "HU", "ID", "IE", "AS", "IL", "IS", "JM", "JO", "JP", "KE", "KN", "KR", "KW", "KY", "AT", "KZ",
        "LC", "LI", "LS", "LT", "LU", "LV", "MA", "MC", "MO", "AU", "MP", "MQ", "MT", "MU", "MW", "MX", "MY", "MZ", "NC", "NI", "BA", "NL", "NO",
        "NZ", "OM", "PA", "PE", "PF", "PH", "PL", "PR", "BB", "PW", "QA", "RE", "RO", "RS", "SA", "SC", "SE", "SG", "SI"
    ],
    sizes: {
        women: [
            { us: "5", eu: "35.5" },
            { us: "5.5", eu: "36" },
            { us: "6", eu: "36.5" },
            { us: "6.5", eu: "37.5" },
            { us: "7", eu: "38" },
            { us: "7.5", eu: "38.5" },
            { us: "8", eu: "39" },
            { us: "8.5", eu: "40" },
            { us: "9", eu: "40.5" },
            { us: "9.5", eu: "41" },
            { us: "10", eu: "42" },
            { us: "10.5", eu: "42.5" },
            { us: "11", eu: "43" },
            { us: "11.5", eu: "44" },
            { us: "12", eu: "44.5" },
            { us: "12.5", eu: "45" },
            { us: "13", eu: "45.5" },
            { us: "13.5", eu: "46" },
            { us: "14", eu: "47" },
            { us: "14.5", eu: "47.5" },
            { us: "15", eu: "48" },
            { us: "15.5", eu: "48.5" },
            { us: "16", eu: "49.5" },
            { us: "16.5", eu: "50.5" },
            { us: "17", eu: "51.5" },
            { us: "17.5", eu: "52.5" },
        ],
        men: [
            { us: "3.5", eu: "35.5" },
            { us: "4", eu: "36" },
            { us: "4.5", eu: "36.5" },
            { us: "5", eu: "37.5" },
            { us: "5.5", eu: "38" },
            { us: "6", eu: "38.5" },
            { us: "6.5", eu: "39" },
            { us: "7", eu: "40" },
            { us: "7.5", eu: "40.5" },
            { us: "8", eu: "41" },
            { us: "8.5", eu: "42" },
            { us: "9", eu: "42.5" },
            { us: "9.5", eu: "43" },
            { us: "10", eu: "44" },
            { us: "10.5", eu: "44.5" },
            { us: "11", eu: "45" },
            { us: "11.5", eu: "45.5" },
            { us: "12", eu: "46" },
            { us: "12.5", eu: "47" },
            { us: "13", eu: "47.5" },
        ],
        gs: [
            { us: "3.5", eu: "35.5" },
            { us: "4", eu: "36" },
            { us: "4.5", eu: "36.5" },
            { us: "5", eu: "37.5" },
            { us: "5.5", eu: "38" },
            { us: "6", eu: "38.5" },
            { us: "6.5", eu: "39" },
            { us: "7", eu: "40" },
        ],
        td: [
            { us: "1", eu: "16" },
            { us: "1.5", eu: "16.5" },
            { us: "2", eu: "17" },
            { us: "2.5", eu: "18" },
            { us: "3", eu: "18.5" },
            { us: "3.5", eu: "19" },
            { us: "4", eu: "19.5" },
            { us: "4.5", eu: "20" },
            { us: "5", eu: "21" },
            { us: "5.5", eu: "21.5" },
            { us: "6", eu: "22" },
            { us: "6.5", eu: "22.5" },
            { us: "7", eu: "23.5" },
            { us: "7.5", eu: "24" },
            { us: "8", eu: "25" },
            { us: "8.5", eu: "25.5" },
            { us: "9", eu: "26" },
            { us: "9.5", eu: "26.5" },
            { us: "10", eu: "27" },
            { us: "10.5", eu: "27.5" },
            { us: "11", eu: "28" },
            { us: "11.5", eu: "28.5" },
            { us: "12", eu: "29.5" },
            { us: "12.5", eu: "30" },
            { us: "13", eu: "31" },
            { us: "13.5", eu: "31.5" },
        ],
        adidas: {
            men: [
                { us: "1", eu: "32" },
                { us: "1.5", eu: "33" },
                { us: "2", eu: "33.5" },
                { us: "2.5", eu: "34" },
                { us: "3", eu: "35" },
                { us: "3.5", eu: "35.5" },
                { us: "4", eu: "36" },
                { us: "4.5", eu: "36 2/3" },
                { us: "5", eu: "37 1/3" },
                { us: "5.5", eu: "38" },
                { us: "6", eu: "38 2/3" },
                { us: "6.5", eu: "39 1/3" },
                { us: "7", eu: "40" },
                { us: "7.5", eu: "40 2/3" },
                { us: "8", eu: "41 1/3" },
                { us: "8.5", eu: "42" },
                { us: "9", eu: "42 2/3" },
                { us: "9.5", eu: "43 1/3" },
                { us: "10", eu: "44" },
                { us: "10.5", eu: "44 2/3" },
                { us: "11", eu: "45 1/3" },
                { us: "11.5", eu: "46" },
                { us: "12", eu: "46 2/3" },
                { us: "12.5", eu: "47 1/3" },
                { us: "13", eu: "48" },
                { us: "13.5", eu: "48 2/3" },
                { us: "14", eu: "49 1/3" },
                { us: "14.5", eu: "50" },
                { us: "15", eu: "50 2/3" },
                { us: "16", eu: "51 1/3" },
                { us: "17", eu: "52 2/3" },
                { us: "18", eu: "53 1/3" },
                { us: "19", eu: "54 2/3" },
                { us: "20", eu: "55 2/3" },
            ],
            gs: [
                { us: "1", eu: "16" },
                { us: "2", eu: "17" },
                { us: "3", eu: "18" },
                { us: "4", eu: "19" },
                { us: "5", eu: "20" },
                { us: "5.5", eu: "21" },
                { us: "6", eu: "22" },
                { us: "6.5", eu: "23" },
                { us: "7", eu: "23.5" },
                { us: "7.5", eu: "24" },
                { us: "8", eu: "25" },
                { us: "8.5", eu: "25.5" },
                { us: "9", eu: "26" },
                { us: "9.5", eu: "26.5" },
                { us: "10", eu: "27" },
                { us: "10.5", eu: "28" },
                { us: "11", eu: "28.5" },
                { us: "11.5", eu: "29" },
                { us: "12", eu: "30" },
                { us: "12.5", eu: "30.5" },
                { us: "13", eu: "31" },
                { us: "13.5", eu: "31.5" },
            ],
            women: [
                { us: "5", eu: "36" },
                { us: "5.5", eu: "36 2/3" },
                { us: "6", eu: "37 1/3" },
                { us: "6.5", eu: "38" },
                { us: "7", eu: "38 2/3" },
                { us: "7.5", eu: "39 1/3" },
                { us: "8", eu: "40" },
                { us: "8.5", eu: "40 2/3" },
                { us: "9", eu: "41" },
                { us: "9.5", eu: "42" },
                { us: "10", eu: "42 2/3" },
                { us: "10.5", eu: "43 1/3" },
                { us: "11", eu: "44" },
                { us: "11.5", eu: "44 2/3" },
                { us: "12", eu: "45 1/3" },
                { us: "12.5", eu: "46" },
                { us: "13", eu: "46 2/3" },
                { us: "13.5", eu: "47 1/3" },
                { us: "14", eu: "48" },
                { us: "14.5", eu: "48 2/3" },
                { us: "15", eu: "49 1/3" },
                { us: "15.5", eu: "50" },
            ]
        }
    }
}