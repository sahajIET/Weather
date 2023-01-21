const express=require('express');

const app=express();
const https=require("https");
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    const city_name=req.body.cityN;
    const key="96c300ffe61876e5afef47a8452e2401"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&units=metric&APPID="+key;
    https.get(url,function(response){
    console.log(response.statusCode);

        response.on("data",function(data)
        {
            const w_data=JSON.parse(data);
            console.log(w_data);
            const tem=w_data.main.temp
            console.log(tem);
            const des=w_data.weather[0].description;
            const icon=w_data.weather[0].icon;
            const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(des);
            //This below line helped to display the image before the text section
            res.write('<head><meta charset="utf-8"></head>');
            //res.write("<img src="+img_url+">");
            res.write("<p>The Weather is currently "+des+"</p>");
            res.write("<h1>The temperature in "+city_name+" is "+tem+" degree Celcius.</h1>");
            res.write("<img src="+img_url+">");
            res.send();
        });
    });
});




app.listen(process.env.PORT ||3000,function(){
    console.log("Server Started on port 3000");
});