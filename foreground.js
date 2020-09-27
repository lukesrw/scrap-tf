/*global browser scrapTFSellWeaponsSort scrapTFSellWeaponsAuto*/

browser.runtime.onMessage.addListener(async options => {
    switch (options.action) {
        case "sort":
            return scrapTFSellWeaponsSort();

        case "auto":
            return scrapTFSellWeaponsAuto(...options.arguments);
    }
});
