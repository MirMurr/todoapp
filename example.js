let cartRowContents = `
    <div class="cart-items-container"> <!--this is when we have an item in the cart, must be empty in the end-->
        <div class="cart-item"> <!--or rhis must be empty and the bove container must be kept? NOPE-->
          <div class="cart-column">
            <img class="cart-item-image" src="${productImageSrc}" alt="sneaker image">
          </div>
          <div class="cart-column">
            <div class="cart-item-name">${title}</div>
            <span class="cart-price">${price}</span>
            <span>x</span>
            <span class="cart-quantity">${cartQuantityElement}</span>
            <span class="cart-total" style="color: black"></span>
          </div>
          <div class="cart-column">
            <button type="button" class="remove-btn">
              <img class="remove-icon" src="./images/icon-delete.svg" alt="delete icon">
            </button>
          </div>
        </div>
        <button class="checkout-btn" type="button">Checkout</button>
      </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItemsContainer.append(cartRow)