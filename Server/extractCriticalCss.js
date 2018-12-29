var critical = require("critical");

critical.generate({
    inline: true,
    base: "dist",
    src: "index.html",
    target: { html: "index-critical.html", css: "critical.css" },
    width: 1920,
    height: 1080,
    timeout: 30000,
    dest: "index.html"
});
