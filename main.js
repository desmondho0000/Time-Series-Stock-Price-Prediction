let carts = document.querySelectorAll('.add-cart');

let products = [
    //G shock Mr-G//
    {
        name: 'MRG-B1000D-1A',
        tag: 'MRG-B1000D-1A',
        price: 11300,
        inCart: 0
    },
    {
        name: 'MRG-B1000B-1A',
        tag: 'MRG-B1000B-1A',
        price: 11301,
        inCart: 0
    },
    {
        name: 'MRG-G2000GA-1A',
        tag: 'MRG-G2000GA-1A',
        price: 11200,
        inCart: 0
    },
    {
        name: 'MRG-G2000HA-1A',
        tag:'MRG-G2000HA-1A',
        price: 32000,
        inCart: 0
    },
    {
        name: 'MRG-G2000R-1A',
        tag: 'MRG-G2000R-1A',
        price: 12000,
        inCart:0
    },
    //G shock MT-G//
    {
        name: 'MTG-B1000-1A',
        tag: 'MTG-B1000-1A',
        price: 3920,
        inCart:0
    },
    {
        name: 'MTG-B1000B-1A',
        tag: 'MTG-B1000B-1A',
        price: 3920,
        inCart:0
    },
    {
        name: 'MTG-B1000B-1A4',
        tag: 'MTG-B1000B-1A4',
        price: 3299,
        inCart:0
    },
    {
        name:'MTG-B1000BD-1A',
        tag: 'MTG-B1000BD-1A',
        price: 3299,
        inCart:0
    },
    {
        name:'MTG-B1000D-1A',
        tag:'MTG-B1000D-1A',
        price:3299,
        inCart:0
    },
    {
        name:'MTG-B1000DCM-1A',
        tag: 'MTG-B1000DCM-1A',
        price: 5200,
        inCart:0
    },
    {
        name:'MTG-B1000XB-1A',
        tag:'MTG-B1000XB-1A',
        price:4800,
        inCart:0
    },
    {
        name:'MTG-B1000XBD-1A',
        tag:'MTG-B1000XBD-1A',
        price:4800,
        inCart:0
    },
    // Master of G//
    {
        name:'G-9400-1',
        tag:'G-9400-1',
        price: 1100,
        inCart:0
    },
    {
        name:'GG-B100-1B',
        tag:'GG-B100-1B',
        price:1300,
        inCart:0
    },
    {
        name:'GG-B100BTN-1A',
        tag:'GG-B100BTN-1A',
        price:1900,
        inCart:0
    },
    {
        name:'GN-1000-1A',
        tag:'GN-1000-1A',
        price:2310,
        inCart:0
    },
    {
        name:'GPR-B1000-1',
        tag:'GPR-B1000-1',
        price:3500,
        inCart:0
    },
    {
        name:'GWG-1000-1A',
        tag:'GWG-1000-1A',
        price:3300,
        inCart:0
    },
    {
        name:'GWN-1000B-1B',
        tag:'GWN-1000B-1B',
        price:1280,
        inCart:0
    },
    {
        name:'GW-9400-1B',
        tag:'GW-9400-1B',
        price:1300,
        inCart:0
    },
    //G shock Limited Edition//
    {
        name:'MRG-G2000BL-9A',
        tag:'MRG-G2000BL-9A',
        price:17500,
        inCart:0
    }

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
            <img src="./All Watch/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
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