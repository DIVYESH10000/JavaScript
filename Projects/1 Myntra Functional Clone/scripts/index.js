

// Whenever we click AddToBag there shousld be a count in Bag icon and when I click it,
// it must show the items in bag, for that we need a Data Structure to store bag items.


let bagItems = [];
onLoad();

// Main function
function onLoad() { 

  // Onloading the page we gotta fetch the bagItems stored in localStorage
  let bagItemStr = localStorage.getItem('bagItems');
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];


  // InnerHtml generic code
  displayItemsOnHomePage();   

  // When there's nothing in bag at starting we gotta call displayBagIcon
  displayBagIcon();

  
}




// Function for AddToBag
function addToBag(itemId) {
  bagItems.push(itemId); 

  // Whenever we click on bag at we've made it a link, the page it goes to makes BagCount = 0,
  // as js is loaded again in pages/bag.html maiking let bagItems = [];
  // to solve this we're saving itemsId in localStorage everytime we bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));


  // Whenever Item is added it increases the bagItems.length i.e. count in bag
  displayBagIcon();     
}

function displayBagIcon() {
  // Increase count in bag after item addedToBag
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if(bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';   // $$$$$$$$$$$$$$$$$$$$$ IMPR
    bagItemCountElement.innerText = bagItems.length;    
  } else {
    bagItemCountElement.style.visibility = 'hidden';    // $$$$$$$$$$$$$$$$$$$$$ IMPR
  }
}


// Function for dispalyItems which previously I wrote inside innerHtml in loop while item assignment

function displayItemsOnHomePage() {
  // Creating object of items-container
  let itemsContainerElement = document.querySelector('.items-container');

  // The moment we include index.js to bag.html, displayItemsOnHomePage() in index,js starts
  // generating the code BUT CAN'T FIND it bag.html as it was meant for index.html, to handle
  // it  we write a check.

  // console.log(itemsContainerElement); // null in bag.html
  if(!itemsContainerElement) {
    return;
  }
  
  // if(itemsContainerElement !== undefined) {
  //   return;
  // }

  // For every item below is the HTML which is gonna be assigned to innerHTML
  let innerHtml = '';
  items.forEach(item => {
    innerHtml += `
    <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="rating">
            ${item.rating.stars} ⭐ | ${Math.round(item.rating.count/1000)}k
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">₹ ${item.current_price}</span>
            <span class="original-price">₹ ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`
  // <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
  // <button class="btn-add-bag" onclick="addToBag(${item})">Add to Bag</button> // Error as we're defining in string form, gotta stringify and extract later // REVIEW

  });
    // Assigning generic innerHTML to itemsContainer
    itemsContainerElement.innerHTML = innerHtml;
}


// Note:  Normal functions we can define anywhere and can call any where
// but anonymous functions WE MUST DEFINE FIRST AND THEN ONLY call or use it.