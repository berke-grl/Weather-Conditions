const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const apiKey = "0ca305032e6633fb24b56e745cc10d31";
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            var weatherData = JSON.parse(data);

            var temperature = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;

            res.write("<p>The weather is " + description + "</p>");
            res.write("<h1>Weather in " + cityName + " is " + temperature + " celcius</h1>");
            res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png></img>");
            res.send();
        });
    });
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
});

