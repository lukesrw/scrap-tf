const fs = require("fs");
const path = require("path");

const TARGET = [__dirname, "js", "scripts.js"];

fs.promises
    .readdir(path.join(...TARGET.slice(0, 2)))
    .then(async files => {
        let contents = await Promise.all(
            files
                .filter(file => file.endsWith(".js") && file !== "scripts.js")
                .map(file => fs.promises.readFile(path.join(...TARGET.slice(0, 2), file), "utf-8"))
        );

        await fs.promises.writeFile(
            path.join(...TARGET),
            `"use strict";

${contents
    .map(content => content.replace('"use strict";', "").trim())
    .join("\n\n")
    .trim()}
`
        );
    })
    .catch(console.log);
