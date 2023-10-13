let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'DATEJUST 31',
        tag:'DATEJUST 31',
        price:50000,
        inCart:0
    },
    
    {
        name:'DATEJUST 36',
        tag:'DATEJUST 36',
        price:35000,
        inCart:0
    },
    {
        name:'DAY-DATE 36',
        tag:'DAY-DATE 36',
        price:200000,
        inCart:0
    },
    {
        name:'LADY-DATEJUST 2',
        tag:'LADY-DATEJUST 2',
        price:150000,
        inCart:0
    },
    {
        name:'LADY-DATEJUST 3',
        tag:'LADY-DATEJUST 3',
        price:90000,
        inCart:0
    },
    {
        name:'LADY-DATEJUST 4',
        tag:'LADY-DATEJUST 4',
        price:170000,
        inCart:0
    },
    {
        name:'LADY-DATEJUST 5',
        tag:'LADY-DATEJUST 5',
        price:80000,
        inCart:0
    },
    {
        name:'LADY-DATEJUST',
        tag:'LADY-DATEJUST',
        price:210000,
        inCart:0
    },
    {
        name:'PEARLMASTER 39',
        tag:'PEARLMASTER 39',
        price:180000,
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
            <img src="./All Watch/${item.tag}.png" style="width: 25%">
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