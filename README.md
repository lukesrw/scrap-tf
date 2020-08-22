# [Scrap.tf][scrap-tf] Scripts

## scrapTFSellWeaponsAuto

### Description

Instead of using the "AutoScrap" option, I like to retain at least 2 of each weapon.

Code should be pasted into the console on the following page: https://scrap.tf/sell/weapons

### Usage

The function is called "scrapTFSellWeaponsAuto" and takes 4 arguments, these are:

| Index | Description                                                                  | Optional | Example  | Default |
| ----- | ---------------------------------------------------------------------------- | -------- | -------- | ------- |
| 0     | Number of weapons to avoid scrapping, i.e. number of duplicates you want + 1 | No       | `2`      |         |
| 1     | Name to find on the weapon, for example "Crafted by \<name>"                 | Yes      | `"Luke"` | `false` |
| 2     | Whether you want to allow half-scraps to be included in the trade            | Yes      | `true`   | `false` |
| 3     | Whether to automatically click "Trade Now!" button                           | Yes      | `true`   | `false` |

### Output

If you don't have sufficient weapons to scrap, the console will display "Nothing to scrap".

If you do have sufficient weapons to scrap, the following is presented:

```
Weapon Counts

| (index)     | Values          |
| ----------- | --------------- |
| Weapon Name | Number To Scrap |

Trade Contents

| (index)   | Values                                       |
| --------- | -------------------------------------------- |
| Refined   | Number of refined you should get             |
| Reclaimed | Number of reclaimed you should get           |
| Scrap     | Number of scrap you should get               |
| Scrap Raw | Total scrap value of refined/reclaimed/scrap |
| Weapons   | Total number of weapons being traded         |
```

[scrap-tf]: https://scrap.tf
