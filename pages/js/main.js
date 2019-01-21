// Inspiration ~ W3School
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 7000); 
}


// Countdown to elections
let day = document.getElementById("day");
let hour = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

let countDownDate = new Date("Feb 16, 2019 00:00:00").getTime();


let x = setInterval(function() {

 let now = new Date().getTime();
    
 let distance = countDownDate - now;
    
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  day.innerHTML = days + " days";
  hour.innerHTML = hours + " hrs";
  min.innerHTML = minutes + " mins";
  sec.innerHTML = seconds + " secs ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "The 2019 General Election is over.";
  }
}, 1000);
