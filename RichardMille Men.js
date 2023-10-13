let carts = document.querySelectorAll('.add-cart');

let products = [
    //RM50-01-RM50-04
    {
        name:'RM50-01',
        tag:'RM50-01',
        price:912000,
        inCart:0
    },
    {
        name:'RM50-02',
        tag:'RM50-02',
        price:1116000,
        inCart:0
    },
    {
        name:'RM50-03',
        tag:'RM50-03',
        price:1094000,
        inCart:0
    },
    {
        name:'RM50-04',
        tag:'RM50-04',
        price:1292000,
        inCart:0
    },
    //RM61-01-RM63-01
    {
        name:'RM61-01',
        tag:'RM61-01',
        price:535000,
        inCart:0
    },
    {
        name:'RM62-01',
        tag:'RM62-01',
        price:756000,
        inCart:0
    },
    {
        name:'RM63-01',
        tag:'RM63-01',
        price:156000,
        inCart:0
    },
    //RM70-00
    {
        name:'RM70-01',
        tag:'RM70-01',
        price:812000,
        inCart:0
    },

    //RM27-03-RM010-RM055
    {
        name:'RM27-03',
        tag:'RM27-03',
        price:3620000,
        inCart:0
    },
    {
        name:'RM010',
        tag:'RM010',
        price:2620000,
        inCart:0
    },
    {
        name:'RM055',
        tag:'RM055',
        price:1920000,
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
            <img src="./Richard Mille/RH Men/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
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