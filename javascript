setInterval(() =>{
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    let time = h + ":" + m;
    document.getElementById('time').innerHTML = time;
},1000);

function checkTime(i){
    if(i<10){
        i = "0" + i;
    }
    return i;
}

// notifications 
function getWeekday(){
    let newDate = new Date();
    let today = newDate.getDay();
    let notificationsMsg = document.getElementById('notifications');
    if(today == 1){
        notificationsMsg.innerHTML = "“All Motivation Mondays need are a little more coffee and a lot more mascara.” —Unknown"
    } else if(today == 2) {
        notificationsMsg.innerHTML = "“Whatever you are, be a good one.” ―Abraham Lincoln"
    } else if(today == 3) {
        notificationsMsg.innerHTML = "“Everything you can imagine is real.”―Pablo Picasso"
    } else if(today == 4) {
        notificationsMsg.innerHTML = "“Your passion is waiting for your courage to catch up.” —Isabelle Lafleche"
    } else if(today == 5) {
        notificationsMsg.innerHTML = "“I challenge you to let every day be a Friday. Permit yourself to be happy every day.” —Joel Osteen” —John D. Rockefeller"
    } else if(today == 6) {
        notificationsMsg.innerHTML = "“Don’t be afraid to give up the good to go for the great.” —John D. Rockefeller"
    } else {
        notificationsMsg.innerHTML = "No one is to blame for your future situation but yourself. If you want to be successful, then become Successful.’” ―Jaymin Shah"
    }   
}

getWeekday();

// Weather 
const proxy = 'https://cors-anywhere.herokuapp.com/';
let weatherIcon = document.querySelector('.weather__icon');
let weatherTitle = document.querySelector('.weather__title');

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a66440674bd9c7028ab11101418e6844`)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        console.log(data);
        weatherTitle.innerHTML = data.weather[0].description;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        getWeatherPhoto(data.weather[0].description);
    })
    .catch(err => {
    })
}
