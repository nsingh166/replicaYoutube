var url = 'https://dummyjson.com/products';

/*
 `<div class="product-card">
      <img class="product-img" src="${product.thumbnail}" />
      <div class="product-info">
        <p class="product-title">${product.title}</p>
        <p class="product-cost">${product.price}</p>
      </div>
    </div>`
*/
var numProducts = 0;
function fadeOut(ev) {
  var card = ev.currentTarget;
  card.classList.add('fade-out');
  setTimeout(function() {
    card.remove();
    numProducts--; // removes one product at a time.
    updateCounter();
  }, 1000); // to fade out the image
  numProducts = document.getElementsByClassName('product-card').length;
  document.getElementById('product-count').textContent = `${numProducts} being displayed`;
}

function updateCounter() { // to get the length and then update the display with how many products are there
  numProducts = document.getElementsByClassName('product-card').length;
  document.getElementById('product-count').textContent = `${numProducts} being displayed`;
}



function buildCard(data) {
  var cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'product-card');

  var imgTag = document.createElement('img');
  imgTag.setAttribute('class', 'product-img');
  imgTag.setAttribute('src', data.thumbnail);

  var titleTag = document.createElement('p');
  titleTag.setAttribute('class', 'product-title');
  titleTag.appendChild(document.createTextNode(data.title));

  var costTag = document.createElement('p');
  costTag.setAttribute('class', 'product-cost');
  costTag.appendChild(document.createTextNode('$' + data.price));

  var productDiv = document.createElement('div');
  productDiv.setAttribute('class', 'product-info');

  productDiv.appendChild(titleTag);
  productDiv.appendChild(costTag);

  cardDiv.appendChild(imgTag);
  cardDiv.appendChild(productDiv);

  cardDiv.addEventListener('click', fadeOut);

  return cardDiv;
}
async function fetchWithDOMAPI() {
  try {
    var response = await fetch(url);
    var data = await response.json();
    var elements = data.products.map(buildCard);
    document.getElementById('product-list').append(...elements)
    updateCounter(); 
  } catch (error) {
    console.log(error);
  }
}

fetchWithDOMAPI();
