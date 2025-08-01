const hour = document.getElementById("hourText");
const minute = document.getElementById("minuteText");
const second = document.getElementById("secondText");
const day = document.getElementById("dayText");
const month = document.getElementById("monthText");
const date = document.getElementById("dateText");
const year = document.getElementById("yearText");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

hour.textContent = new Date().getHours();
minute.textContent = new Date().getMinutes();
second.textContent = new Date().getSeconds();
day.textContent = days[new Date().getDay()];
date.textContent = new Date().getDate();
month.textContent = months[new Date().getMonth()]; //new Date().getMonth();
year.textContent = new Date().getFullYear();

function updateTime(){
    const now = new Date();
    hour.textContent = now.getHours().toString().padStart(2, "0");
    minute.textContent = now.getMinutes().toString().padStart(2, "0");
    second.textContent = now.getSeconds().toString().padStart(2, "0");

    day.textContent = days[now.getDay()];
    month.textContent = months[now.getMonth()];
    year.textContent = now.getFullYear();
}
updateTime();

setInterval(updateTime, 1000);