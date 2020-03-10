const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city from the html form, display in // console. Takes in as string.
        var lat = String(req.body.latInput);
        console.log(req.body.cityInput);
        var lon = String(req.body.lonInput);
        console.log(req.body.lonInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "67f6b382921c1e89b39b20d4f9556f22";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&units=" + units+ "&APPID=" + apiKey;
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const maxTemp = weatherData.main.temp_max
            const minTemp = weatherData.main.temp_min
            const wind = weatherData.wind.deg
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Max Temperature in " + city + " is " + maxTemp + " Degrees Fahrenheit<h2>");
            res.write("<h2>The Min Temperature in " + city + " is " + minTemp + " Degrees Fahrenheit<h2>");
            res.write("The wind speed " + windSpeed+  " miles/hour");
            res.write("The wind direction is " + wind+  " degrees");

            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});