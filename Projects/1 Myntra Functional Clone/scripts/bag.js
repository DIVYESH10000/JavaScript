/*                             bag-items-container                         */
const CONVENIENCE_FEE = 99;
let bagItemObjects;

// This is load of this js file
onLoad();


function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}


function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  // To calculate above value we need to iterate bagItemObjects
  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price -bagItem.current_price
  })

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;




  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
              <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
              <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">₹ ${totalMRP}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Discount on MRP</span>
                <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">₹ 99</span>
              </div>
              <hr>
              <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">₹ ${finalPayment}</span>
              </div>
            </div>
            <button class="btn-place-order">
              <div class="css-xjhrni">PLACE ORDER</div>
            </button>
    `;

}




function loadBagItemObjects() {
  console.log(bagItems);  // This is bag item IDs we NEED to convert them to bag Item Objects,
  // to do this we'll use map() which converts array to an array based on condition.
  // Now we need to iterate items in items.js , put a check for ItemId if matches then fetch

  bagItemObjects = bagItems.map(itemId => {
    for(let i = 0; i < items.length; i++) {
      if(itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);

  // JavaScript\Projects\1 Myntra Functional Clone\images\4.jpg
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');

  // Here for every object, using generateItemHTML(bagItem) and assigning to innerHTML
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem)
  })

  containerElement.innerHTML =  innerHTML;
}


// Function to remove bag Items on clicking the X button
function removeFromBag(itemId) {

  // First we remove single element from bagItems them update bagItemObjects.
  // to do that we can use filter() as we can't use splice because we donno the index.

  // This gonna gimme all except itemId. bagItems at this time only has itemIds
  bagItems = bagItems.filter(bagItemId => bagItemId  != itemId);

  // We have made changes so we gotta save'em
  localStorage.setItem('bagItems', JSON.stringify(bagItems));

  // Based on bagItems, bagItemObjects is updated so we invoke loadBagItemObjects();
  loadBagItemObjects();
  
  // Updating BagCount as well
  displayBagIcon();

  // Now DS is updated but to update UI we're Painting again.
  displayBagItems();

  // Bag Summary update
  displayBagSummary();

}

// Generic code to generate bagElements
function generateItemHTML(item) {
  // Note : We don't have items, we just have itemId. Using that we gotta fetch item
  // and generate HTML fro each item.
  // ${item.image}
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs. ${item.current_price}</span>
                <span class="original-price">Rs. ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">10 Oct 2023</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "
            removeFromBag(${item.id})">X</div>
          </div>
`;


}


