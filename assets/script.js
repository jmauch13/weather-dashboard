$(document).ready(function() {

    $("#cityWeather,#past-searches").on("click", function() {

        let clickEvent = $(event.target)[0];
        let location = "";
        if (clickEvent.id === "cityWeather") {
            location = $("#selectCity").val().trim().toUpperCase();
        } else if (clickEvent.className === ("cityList") ) {
            location = clickEvent.innerText;
        }
        if (location == "") return;

        updateLocalStorage (location);

        getCurrentWeather(location);

        getForcastWeather(location);
    });

    // current date .moment function goes here
    var date = moment().format("dddd, MMMM Do YYYY");
    var dateAndTime = moment().format("YYYY-MM-DD HH:MM:SS");

    function updateLocalStorage(location) {

        let cityList =JSON.parse(localStorage.getItem("cityList")) || [];
        cityList.push(location);
        cityList.sort();

        for (let i = 1; i<cityList.length; i++) {
            if (cityList[i] === cityList[i-1]) cityList.splice(i,1);
        }

        localStorage.setItem("cityList", JSON.stringify(cityList));

        $("#cityName").val("");
        }

    function currentLocation() {
        let location = {};

    function success(position) {
        location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            success: true
        }

        getCurrentWeather(location);
        getForcastWeather(location);
    }
    
    function error() {
        location = { success: false }
        return location;
    }

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by browser");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
    
    function getCurrentWeather(loc) {
        let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

        $("#past-searches").empty();

    cityList.forEach ( function(city) {
        let cityHistoryName = $("<div>");
        cityHistoryName.addClass("cityList");
        cityHistoryName.attr("value", city);
        cityHistoryName.text(city);
        $("past-searches").append(cityHistoryName);
    });

    $("#city-search").val("");

    if (typeof loc === "object") {
        city = `lat=${loc.latitude}&lon=${loc.longitude}`;
    }   else {
        city = `q=${loc}`;
    }


    var currentURL = "https://api.openweathermap.org/data/2.5/weather?";
    var cityName = city;
    var unitsURL = "&units=imperial";
    var apiIdURL = "&appid=";
    var apiKey = "2ccfd496e931f8ab426e3501c647b227";
    var currentWeatherAPI = currentURL + cityName + unitsURL + apiIdURL + apiKey;

    $.ajax({
        url: currentWeatherAPI,
        method: "GET"
    }).then(function(response1) {

    weatherObj
    })



    }
    })
    
    













