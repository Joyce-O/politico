// let ul = document.getElementById('ul');
const createNode = (element) => {
  return document.createElement(element);
};
const append = (parent, el) => {
  return parent.appendChild(el);
}
let day = createNode('li');
let daySpan = createNode('span');
let hour = createNode('li');
let hourSpan = createNode('span');
let min = createNode('li');
let minSpan = createNode('span');
let sec = createNode('li');
let secSpan = createNode('span');

day.className = "demo";
daySpan.className= "count-span";
hour.className = "demo";
hourSpan.className= "count-span";
min.className = "demo";
minSpan.className= "count-span";
sec.className = "demo";
secSpan.className= "count-span";
let countDownDate = new Date("Feb 16, 2019 00:00:00").getTime();


let x = setInterval(function() {

 let now = new Date().getTime();
    
 let distance = countDownDate - now;
    
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  day.innerHTML = ((days.toString().length) !== 1) ? days : `0${days}`;
  daySpan.innerHTML = 'days';
  hour.innerHTML = ((hours.toString().length) !== 1) ? hours : `0${hours}`;
  hourSpan.innerHTML = 'hours'
  min.innerHTML = ((minutes.toString().length) !== 1) ? minutes : `0${minutes}`;
  minSpan.innerHTML = 'mins';
  sec.innerHTML = ((seconds.toString().length) !== 1) ? seconds : `0${seconds}`;
  secSpan.innerHTML = 'secs';
  append(day, daySpan);
  append(ul, day);
  append(hour, hourSpan);
  append(ul, hour);
  append(min, minSpan);
  append(ul, min);
  append(sec, secSpan);
  append(ul, sec);

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "The 2019 General Election is over.";
  }
}, 1000);
