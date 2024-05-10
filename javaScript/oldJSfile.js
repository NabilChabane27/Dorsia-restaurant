const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});




//younes part



function filterArticles(c){
  var x,i;
  x = document.getElementsByClassName("article_element");
  if (c=="all") c="";
  for (i= 0 ; i<x.length ; i++){
    removeClass(x[i],"show");

    if(x[i].className.indexOf(c) > -1) addClass(x[i] ,"show");
  }



}

function addClass(element,name){
  var i , arr1,arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for(i = 0 ; i < arr2.length ; i++){
    if(arr1.indexOf(arr2[i]) == -1){
      element.className += " " + arr2[i];
    }


  }
}
function removeClass(element ,name){
  var i,arr1 , arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0;i< arr2.length;i++){
    while(arr1.indexOf(arr2[i]) > -1 ){

      arr1.splice(arr1.indexOf(arr2[i]) ,1);
    }

  }
  element.className = arr1.join(" ");


}
document.addEventListener("DOMContentLoaded", (event)=>{
  filterArticles("all");
});



// filtering the prices in the article

document.addEventListener("DOMContentLoaded", (event) => {
  let sizes = {
    's': 250,
    'm': 400,
    'l': 550,
    'xl': 650,
    '2xl': 800
  };

  const selectElement = document.getElementById("burgerSize");
  const resultElement = document.getElementById("price");

  selectElement.addEventListener("change", () => {
    const selectedValue = selectElement.value;
    const price = sizes[selectedValue];
    resultElement.textContent = `Final price is: ${price} USD`;
  });
  
});

document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the "delayed-image" class
  const delayedElements = document.querySelectorAll('.delayed-image');

  // Loop through each delayed element
  delayedElements.forEach(function(element) {
    // Set a timeout to show the image after 150 milliseconds (0.15 seconds)
    setTimeout(function() {
      // Remove the "delayed-image" class to display the image
      element.classList.remove('delayed-image');
    }, 150); // 150 milliseconds delay
  });
});
