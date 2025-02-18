const express = require("express");
const app = express();
const path = require("path");

const port = 8080;
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/rolldice", (req, res) => {
    let diceval = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { diceval: diceval });
});

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    
    if (instaData[username]) {
        const data = instaData[username];
        console.log(data);
        res.render("instagram", { data });
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

