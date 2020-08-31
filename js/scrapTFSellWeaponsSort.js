"use strict";

/**
 * @see https://scrap.tf/sell/weapons
 * @returns {void} Nothing returned, will sort weapons
 */
function scrapTFSellWeaponsSort() {
    var container = document.querySelector("#user-bp-440 .items-container");

    Array.from(container.children)
        .sort(function (weapon1, weapon2) {
            if (weapon1.dataset.defindex > weapon2.dataset.defindex) return 1;

            if (weapon1.dataset.defindex < weapon2.dataset.defindex) return -1;

            return 0;
        })
        .forEach(function (weapon) {
            container.appendChild(weapon);
        });
}
