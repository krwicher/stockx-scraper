const axios = require('iyaxios').default;
const stockxConfig = require('./functions/configStockx');
const configRequest = require('./functions/configRequest');
const UserAgent = require('user-agents');

// 399007023331
module.exports = {
    ProxyList: configRequest.ProxyList,
    /**
     * Returns the first item found on stockx
     * 
     * @param {String} item Name or SKU to scrape
     * @param {Object} options Optionnal settings
     * @param {String} options.currency Currency ticker
     * @param {String} options.country Country ticker
     * @param {String} options.proxy Proxy url or ProxyList
     */
    getProduct: async (item, options) => {
        if (typeof item !== "string") throw TypeError('Wrong item, please use string');


        if (options?.currency !== undefined && !stockxConfig.currencys.includes(options?.currency)) throw SyntaxError(`${options.currency} is not a valid currency`);

        const currency = options?.currency ? options.currency : "USD";

        if (options?.country !== undefined && !stockxConfig.countrys.includes(options?.country)) throw SyntaxError(`${options.country} is not a valid country`);

        const country = stockxConfig.countrys.includes(options?.country) ? options.country : "US";

        try {
            const url = `https://stockx.com/api/browse?_search=${encodeURIComponent(item)}}&page=1&resultsPerPage=10&dataType=product&facetsToRetrieve[]=browseVerticals&propsToRetrieve[][]=brand&propsToRetrieve[][]=colorway&propsToRetrieve[][]=media.thumbUrl&propsToRetrieve[][]=title&propsToRetrieve[][]=productCategory&propsToRetrieve[][]=shortDescription&propsToRetrieve[][]=urlKey`;
            const product = await axios.get(url, configRequest.searchAndGetProduct(options)).then(res => {
                return {
                    name: res.data.Products[0].title,
                    description: res.data.Products[0].shortDescription,
                    image: res.data.Products[0].media.thumbUrl,
                    url: "https://stockx.com/" + res.data.Products[0].urlKey,
                    uuid: res.data.Products[0].objectID,
                    seller: res.data.Products[0].brand,
                    colorway: res.data.Products[0].colorway,
                }
            })
            return product
        } catch (e) {
            if (e.code === "ECONNREFUSED") throw Error('Connection not possible')
            throw e
        }
    },
    getProductPrice: async (item, options) => {
        if (typeof item !== "string") throw TypeError('Wrong item, please use string');

        try {
            const url = `https://stockx.com/api/products/${item}?includes=market,360&currency=EUR&page=1&resultsPerPage=10&dataType=product&facetsToRetrieve[]=browseVerticals&propsToRetrieve[][]=brand&propsToRetrieve[][]=colorway&propsToRetrieve[][]=media.thumbUrl&propsToRetrieve[][]=title&propsToRetrieve[][]=productCategory&propsToRetrieve[][]=shortDescription&propsToRetrieve[][]=urlKey`;
            const product = await axios.get(url, configRequest.searchAndGetProduct(options)).then(res => {
                shoe_data = res.data;
                let market = shoe_data.Product.market
                return {
                    lastSale: market.lastSale,
                    lastSaleSize: market.lastSaleSize,
                    lastSaleDate: market.lastSaleDate,
                    annualHigh: market.annualHigh,
                    annualLow: market.annualLow,
                    sizes: {}
                }
            })
            return product
        } catch (e) {
            if (e.code === "ECONNREFUSED") throw Error('Connection not possible')
            throw e
        }
    },
}