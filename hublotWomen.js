let carts = document.querySelectorAll('.add-cart');

let products = [
   //38,33MM
    {
        name:'BLACK MAGIC DIAMONDS BRACELET Ladies ',
        tag:'BLACK MAGIC DIAMONDS BRACELET',
        price:25532,
        inCart:0
    },
    
    {
        name:'CERAMIC BLUE DIAMONDS BRACELET Ladies',
        tag:'CERAMIC BLUE DIAMONDS BRACELET',
        price:23532,
        inCart:0
    },
    {
        name:'KING GOLD BROWN DIAMONDS BRACELET Ladies',
        tag:'KING GOLD BROWN DIAMONDS BRACELET',
        price:27562,
        inCart:0
    },
    {
        name:'KING GOLD PURPLE DIAMONDS BRACELET Ladies',
        tag:'KING GOLD PURPLE DIAMONDS BRACELET',
        price:29532,
        inCart:0
    },
    {
        name:'TITANIUM BROWN DIAMONDS BRACELET Ladies',
        tag:'TITANIUM BROWN DIAMONDS BRACELET',
        price:29832,
        inCart:0
    },
    {
        name:'TITANIUM PURPLE DIAMONDS BRACELET Ladies',
        tag:'TITANIUM PURPLE DIAMONDS BRACELET',
        price:23532,
        inCart:0
    },
    //BERLUTI
    {
        name:'CHRONOGRAPH BERLUTI COLD GOLD Ladies',
        tag:'CHRONOGRAPH BERLUTI COLD GOLD',
        price:35532,
        inCart:0
    },
    {
        name:'CHRONOGRAPH BERLUTI COLD Ladies',
        tag:'CHRONOGRAPH BERLUTI COLD',
        price:34532,
        inCart:0
    },
    //CRUZ DIEZ
    {
        name:'CRUZ DIEZ  CERAMIC Ladies (NEW)',
        tag:'CRUZ DIEZ  CERAMIC',
        price:43532,
        inCart:0
    },
    {
        name:'CRUZ DIEZ  KING GOLD Ladies (NEW)',
        tag:'CRUZ DIEZ  KING GOLD',
        price:43532,
        inCart:0
    },
    {
        name:'CRUZ DIEZ TITANIUM Ladies (NEW)',
        tag:'CRUZ DIEZ TITANIUM',
        price:45532,
        inCart:0
    },

]




for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    // console.log("The price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }


}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartproduct");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cartproducts">
            <img src="./HUBLOT/HuBlot Women/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
            <span>${item.name}</span> 
            </div>
            <div class="cartprice">RM ${item.price}</div>
            <div class="cartquantity">${item.inCart}</div>
            <div class="carttotal">
                RM ${item.inCart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML += `
                <div class="cartTotalContainer">
                    <h4 class="cartTotalTitle">
                        Basket Total
                    </h4>
                    <h4 class="cartTotal">
                    RM ${cartCost}.00
                    </h4>
                    </div>
                `;
    }
}

function removeItems() {
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');
    location.reload();
}

onLoadCartNumbers();
displayCart();