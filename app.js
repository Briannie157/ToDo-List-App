//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy a Journal", "Go on a Hike", "Finish on my project Dvpt"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    listOfItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    listOfItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000.");
})
