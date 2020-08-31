"use strict";

/**
 * @see https://scrap.tf/sell/weapons
 * @param {number} number_of_weapons_to_retain Number of weapons to avoid scrapping, i.e. number of duplicates you want + 1
 * @param {string|false} [filter_by_name] Name to find on the weapon, for example in the "Crafted by <name>" tag
 * @param {boolean} [allow_half_scrap=false] Whether you want to allow half-scraps to be included in the trade
 * @param {boolean} [do_auto_trade=false] Whether to automatically click "Trade Now!" button
 * @returns {void} Nothing returned, will select items to scrap
 */
function scrapTFSellWeaponsAuto(number_of_weapons_to_retain, filter_by_name, allow_half_scrap, do_auto_trade) {
    var WEAPONS_TO_SCRAP = 2;
    var SCRAP_TO_RECLAIMED = 3;
    var RECLAIMED_TO_REFINED = 3;

    var items_removed = 0;
    var item_counts = {};

    // eslint complains about order of keys
    /* eslint-disable */
    var item_value = {
        Refined: 0,
        Reclaimed: 0,
        Scrap: 0,
        "Scrap Raw": 0,
        Weapons: 0
    };
    /* eslint-enable */

    console.clear(); // eslint-disable-line

    document.getElementById("ClearSelectedReverse").click();
    Array.prototype.forEach.call(document.querySelectorAll("#user-bp-440 .item"), function (item) {
        if (!Object.prototype.hasOwnProperty.call(item_counts, item.dataset.defindex)) {
            item_counts[item.dataset.defindex] = [];
        }
        item_counts[item.dataset.defindex].push(item);
    });

    Object.keys(item_counts).forEach(function (id) {
        items_removed = 0;
        if (item_counts[id].length >= number_of_weapons_to_retain + 1) {
            // remove anything with given name
            if (filter_by_name) {
                item_counts[id] = item_counts[id].filter(function (item) {
                    if (
                        item.dataset.content.indexOf(filter_by_name) > -1 ||
                        (item.dataset.title.substr(0, 1) === "&" && item.dataset.title.substr(-1) === ";")
                    ) {
                        items_removed += 1;

                        return false;
                    }

                    return true;
                });
            }

            item_counts[id].slice(number_of_weapons_to_retain - items_removed).forEach(function (item) {
                item.click();
            });
            item_counts[id] = document.querySelectorAll('.selected-item[data-defindex="' + id + '"]').length;
            item_value.Weapons += item_counts[id];
            if (item_counts[id] === 0) delete item_counts[id];
        } else {
            delete item_counts[id];
        }
    });

    // remove any half-scraps
    if (!allow_half_scrap && item_value.Weapons % 2 !== 0) {
        allow_half_scrap = document.querySelector(".selected-item");
        allow_half_scrap.click();

        item_value.Weapons -= 1;
        item_counts[allow_half_scrap.dataset.defindex] -= 1;

        if (item_counts[allow_half_scrap.dataset.defindex] === 0) delete item_counts[allow_half_scrap.dataset.defindex];
    }

    // convert item_counts into names
    Object.keys(item_counts).forEach(function (id) {
        item_counts[document.querySelector('.item[data-defindex="' + id + '"]').dataset.title] = item_counts[id];
        delete item_counts[id];
    });

    item_value.Scrap = Math.floor(item_value.Weapons / WEAPONS_TO_SCRAP);
    item_value["Scrap Raw"] = Math.floor(item_value.Weapons / WEAPONS_TO_SCRAP);
    item_value.Reclaimed = Math.floor(item_value.Scrap / SCRAP_TO_RECLAIMED);
    item_value.Scrap -= item_value.Reclaimed * SCRAP_TO_RECLAIMED;
    item_value.Refined = Math.floor(item_value.Reclaimed / RECLAIMED_TO_REFINED);
    item_value.Reclaimed -= item_value.Refined * RECLAIMED_TO_REFINED;

    // eslint complains about console output
    /* eslint-disable */
    if (item_value.Weapons > 0) {
        console.log("Weapon Counts");
        console.table(item_counts);

        console.log("Trade Contents");
        console.table(item_value);
    } else {
        console.log("Nothing to scrap");
    }
    /* eslint-enable */

    if (do_auto_trade && item_value.Weapons > 0) document.querySelector(".btn-tradenow").click();
}
