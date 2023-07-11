const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

// calculates degree of clock's stick
const getDegree = (time, divided = 60) => {
    return (360 / divided) * time + 90;
}

// sets current time every second
function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    secondHand.style.transform = `rotate(${getDegree(seconds)}deg)`;
    minHand.style.transform = `rotate(${getDegree(mins)}deg)`;
    hourHand.style.transform = `rotate(${getDegree(hours, 24)}deg)`;
}

setInterval(setDate, 1000);