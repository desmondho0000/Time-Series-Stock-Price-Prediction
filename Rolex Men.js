let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'AIR-KING ',
        tag:'AIR-KING',
        price:27000,
        inCart:0
    },
    
    {
        name:'MILGAUSS',
        tag:'MILGAUSS',
        price:33000,
        inCart:0
    },
    {
        name:'DATEJUST 41',
        tag:'DATEJUST 41',
        price:40000,
        inCart:0
    },
    {
        name:'DAY-DATE 40',
        tag:'DAY-DATE 40',
        price:130000,
        inCart:0
    },
    {
        name:'GMT-MASTER II',
        tag:'GMT-MASTER II',
        price:140000,
        inCart:0
    },
    {
        name:'OYSTER PERPETUAL 39',
        tag:'OYSTER PERPETUAL 39',
        price:25000,
        inCart:0
    },
    {
        name:'SKY_DWELLER',
        tag:'SKY_DWELLER',
        price:210000,
        inCart:0
    },
    {
        name:'SUBMARINER DATE',
        tag:'SUBMARINER DATE',
        price:35000,
        inCart:0
    },
    {
        name:'YACHT-MASTER 42',
        tag:'YACHT-MASTER 42',
        price:120000,
        inCart:0
    },
    {
        name:'ROLEX DEEPSEA',
        tag:'ROLEX DEEPSEA',
        price:48000,
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