
//massil's part

// Menu Button and Navigation Links
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

// Filtering Articles Function
function filterArticles(c) {
  var x, i;
  x = document.getElementsByClassName("article_element");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}

// Add Class Function
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Remove Class Function
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Initialize Article Filtering on DOM Content Load
document.addEventListener("DOMContentLoaded", (event) => {
  filterArticles("all");
});

// Scroll Reveal Animation Options
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Scroll Reveal Animation for Header Elements
/*ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});*/
/*ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});*/

// Younes' s Part
const sizes = {
  's': 250,
  'double': 400
};

const selectElement = document.getElementById("burgerSize");
const quantityElement = document.getElementById("burgerQ");
const resultElement = document.getElementById("price");
let nameE = document.getElementById("article-name");

function calculatePrice( ) {
  let priceToAdd = 0;
  const selectedSize = selectElement.value;
  let quantity = parseInt(quantityElement.value);
  let pricePerBurger = sizes[selectedSize];
  let articleName = nameE.textContent.trim().toLowerCase();
  
  // selecting prices based on selected item
  switch(articleName){
    case "cheese burger": 
      priceToAdd = 100; console.log(priceToAdd);
      break;
    case "caprise burger": 
      priceToAdd = 150; console.log(priceToAdd);
      break;
    case "buffalo blue cheese burger" :priceToAdd = 200; console.log(priceToAdd); break;
    case "greek lamb burger":
    priceToAdd = 140; console.log(priceToAdd);
    break;

    case "mushroom swiss burger":
    priceToAdd = 170; console.log(priceToAdd);
    break;

    case "chicken nuggets bbq sauce":
    priceToAdd = 50; console.log(priceToAdd);
    break;

    case "hammoud white":
      if (selectedSize === 's'){
        pricePerBurger = 60;  
      }else {pricePerBurger =110 ;}
    
    break;
    case "saida" : 
    if (selectedSize === 's'){
      pricePerBurger = 30;  
    }else {pricePerBurger =60 ;}
    break;

    case  "hammoud selecto":
      if (selectedSize === 's'){
        pricePerBurger = 60;  
      }else {pricePerBurger =110 ;}
      break;
      case "coca cola":
        if (selectedSize === 's'){
          pricePerBurger = 70;  
        }else {pricePerBurger =120 ;}
      break;
      case "ifruit royal":
        if (selectedSize === 's'){
          pricePerBurger = 70;  
        }else {pricePerBurger =120 ;}
      break;
    default : 
      priceToAdd = 0; // Set priceToAdd to 0 for all other cases
  }
  
  const totalPrice = (pricePerBurger * quantity)+priceToAdd;
  resultElement.textContent = `Total Price : ${totalPrice}   DZD`;
  return totalPrice;
}

selectElement.addEventListener("change", calculatePrice);
quantityElement.addEventListener("change", calculatePrice);

// Initial calculation
calculatePrice();

// Load the saved toBuyList from local storage if available
let toBuyList = JSON.parse(localStorage.getItem('toBuyList')) || [];


function updateTotalPrice() {
  let totalPrice = 0; // Initialize total price

  toBuyList.forEach((item) => {
    totalPrice += item.price * item.quantity; // Calculate total price for each item
  });

  // Update total price in modal content
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total Price: ${totalPrice} DZD`;
  } else {
    const checkoutContent = document.querySelector(".checkout_content");
    checkoutContent.innerHTML += `<div id="totalPrice">Total Price: ${totalPrice} DZD</div>`;
  }
}

function toggleModal() {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.style.display = (modalContainer.style.display === 'block') ? 'none' : 'block';

  const checkoutContent = document.querySelector(".checkout_content");
  checkoutContent.innerHTML = `${toBuyList.length} commands available:<br>`;

  toBuyList.forEach((item, index) => {
    checkoutContent.innerHTML += `
      <div id="item-${index}">
        ${index + 1}. Name: ${item.name}, Size: ${item.size}, Quantity: ${item.quantity}
        <button class="remove" onclick="removeCommand(${index})">Remove</button>
      </div>
    `;
  });

  // Update total price
  updateTotalPrice();
}

function addToList(articleName) {
  let item_name = articleName;
  let commandPrice = calculatePrice();
  let item_size = selectElement.value;
  let item_quantity = parseInt(quantityElement.value);
  let item_price = commandPrice;
  let item = {
    'name': item_name,
    'size': item_size,
    'quantity': item_quantity,
    'price': item_price
  };
  toBuyList.push(item);
  localStorage.setItem('toBuyList', JSON.stringify(toBuyList)); // Save to local storage
  toggleModal(); // Open modal after adding item
}

function removeCommand(index) {
  // Remove item from array
  const removedItem = toBuyList.splice(index, 1)[0];

  // Update local storage after removing item
  localStorage.setItem('toBuyList', JSON.stringify(toBuyList));

  // Update total price
  updateTotalPrice();

  // Update specific item in modal content
  const checkoutContent = document.querySelector(".checkout_content");
  const itemElement = checkoutContent.querySelector(`#item-${index}`);
  if (itemElement) {
    checkoutContent.removeChild(itemElement);
  }
}
