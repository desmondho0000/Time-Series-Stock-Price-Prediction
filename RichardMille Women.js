let carts = document.querySelectorAll('.add-cart');

let products = [
    //RM01-00-RM72-00
    {
        name:'RM70-01R',
        tag:'RM70-01R',
        price:1912000,
        inCart:0
    },
    {
        name:'RM70-01W',
        tag:'RM70-01W',
        price:2912000,
        inCart:0
    },
    {
        name:'RM51-02',
        tag:'RM51-02',
        price:712000,
        inCart:0
    },
    {
        name:'RM037',
        tag:'RM037',
        price:3912000,
        inCart:0
    },
    {
        name:'RM19-02',
        tag:'RM19-02',
        price:812000,
        inCart:0
    },
    {
        name:'RM07-02',
        tag:'RM07-02',
        price:4912000,
        inCart:0
    },
    //BONBON
    {
        name:'BONBON',
        tag:'BONBON',
        price:912000,
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
            <img src="./Richard Mille/RH Women/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
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