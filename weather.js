const express = require("express");
const https  = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


  // for get request

app.get("/", function(request,response){

    response.sendFile(__dirname + "/index.html");

});

    // for post request

app.post("/",function(request,response){

    
    const query = request.body.cityName;
    const apiKey = "8ed0f27edc0fb74a24667c4bbe2b2101";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ unit;

    https.get(url,function(res){

        console.log(res.statusCode);
      

        res.on("data",function(data){
            // const name = request.body.name;

            const weatherData = JSON.parse(data)
            const name = weatherData.name;

            // time function
            const time = new Date();
           
            console.log(`Date: ${time.toDateString()}`);
            console.log(`Time: ${time.toTimeString()}`);  

            const temp = weatherData.main.temp
            
            const weatherDescription = weatherData.weather[0].description
            const icon  = weatherData.weather[0].icon
            const imgageURL =  " http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            response.write("<h1>Currently Weather is " + weatherDescription + ".<h1>");

            response.write("<h3> Temperature in "+name+"  is " + temp + " degree Celsius. </h3>");
            response.write("<hr>")
            response.write("<h2>Date :"+time.toDateString()+ "  "+ "Time :" +time.toTimeString()+  "</h2>");

            response.write("<img src="+ imgageURL +">");
            
            response.send()

        });
    });




});    









app.listen(3000, function(){
    console.log("Server running on port 3000.");
});