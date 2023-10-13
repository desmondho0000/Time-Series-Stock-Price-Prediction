let carts = document.querySelectorAll('.add-cart');

let products = [
    //G shock Mr-G//
    {
        name: '15210BC.OO.A002CR.01',
        tag: 'CODE 11.59 A',
        price: 1200000,
        inCart: 0
    },
    {
        name: '15210BC.OO.A321CR.01',
        tag: 'CODE 11.59 B',
        price: 150000,
        inCart: 0
    },
    {
        name: '15210BC.OO.A321CR.99',
        tag: 'CODE 11.59 C',
        price: 150000,
        inCart: 0
    },
    {
        name: '15210OR.OO.A002CR.01',
        tag:'CODE 11.59 D',
        price: 150000,
        inCart: 0
    },
    {
        name: '15210OR.OO.A099CR.01',
        tag: 'CODE 11.59 E',
        price: 140000,
        inCart:0
    },
    {
        name: '26393BC.OO.A002CR.01',
        tag: 'CODE 11.59 F',
        price: 125000,
        inCart:0
    },
    {
        name: '26393BC.OO.A321CR.01',
        tag: 'CODE 11.59 G',
        price: 150000,
        inCart:0
    },
    {
        name: '#26065IS.OO.1105IS.01',
        tag: 'ROYAL OAK A',
        price: 100000,
        inCart:0
    },
    {
        name:'#26343CE.OO.1247CE.01',
        tag: 'ROYAL OAK B',
        price: 90000,
        inCart:0
    },
    {
        name:'#26591PT.OO.D002CR.01',
        tag:'ROYAL OAK C',
        price:120000,
        inCart:0
    },
    {
        name:'#26591TI.OO.1252TI.01',
        tag: 'ROYAL OAK D',
        price: 130000,
        inCart:0
    },
    {
        name:'#15407BC.GG.1224BC.01',
        tag:'ROYAL OAK E',
        price:140000,
        inCart:0
    },
    {
        name:'#15407OR.OO.1220OR.01',
        tag:'ROYAL OAK F',
        price:25000,
        inCart:0
    },
    {
        name:'#15500OR.OO.1220OR.01',
        tag:'ROYAL OAK G',
        price: 100000,
        inCart:0
    },
    {
        name:'#15500OR.OO.D002CR.01',
        tag:'ROYAL OAK H',
        price:210000,
        inCart:0
    },
    {
        name:'[RE]MASTER01',
        tag:'[RE]MASTER01',
        price:200000,
        inCart:0
    },
    {
        name:'26600CR.OO.D002CR.99',
        tag:'CODE 11.59',
        price:185000,
        inCart:0
    },
    {
        name:'#26589TI.GG.D006CA.01',
        tag:'ROYAL OAK CONCEPT',
        price:190000,
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