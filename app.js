//declaring variables
const timezone = document.getElementById("timezone");
const temperature = document.getElementById("temperature");
const icon = document.querySelector(".icon");
const descr = document.querySelector("#descr");

//geolocation - getting coords
let lat, long;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        
        const proxy = "https://cors-anywhere.herokuapp.com/";
        let api = `${proxy}https://api.darksky.net/forecast/645e309766c29da9087b087ff7170c46/${lat},${long}`;
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                //covert from F to Celsius and update DOM
                let celsius = Math.floor((data.currently.temperature - 32) / 1.8);
                temperature.textContent = celsius;
                //set timezone
                let regex = /(?<=\/).*/;
                let regulatedTimezone = data.timezone.match(regex)[0];
                timezone.textContent = regulatedTimezone;
                //set description
                descr.textContent = data.currently.summary;
                //Set Icon
                setIcon(data.currently.icon, document.querySelector(".icon"));
            });
    });
    function setIcon(icon, iconID) {
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
} else {
    alert("'navigator.geolocation' is not enabled on your browser'");
}

