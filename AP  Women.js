let carts = document.querySelectorAll('.add-cart');

let products = [
    //ROYAL
    {
        name:'ROYAL OAK SELFWINDING Ladies (NEW)',
        tag:'ROYAL OAK SELFWINDING',
        price:25532,
        inCart:0
    },
    {
        name:'SELFWINDING CHRONOGRAPH Ladies ',
        tag:'SELFWINDING CHRONOGRAPH',
        price:22632,
        inCart:0
    },
    {
        name:'SELFWINDING CHRONOGRAPH 01 Ladies ',
        tag:'SELFWINDING CHRONOGRAPH 01',
        price:19032,
        inCart:0
    },
    {
        name:'SELFWINDING CHRONOGRAPH 02 Ladies ',
        tag:'SELFWINDING CHRONOGRAPH 02',
        price:19032,
        inCart:0
    },
    //RAYOL OAK
    {
        name:'ROYAL OAK  01 Ladies ',
        tag:'ROYAL OAK  01',
        price:15532,
        inCart:0
    },
    {
        name:'ROYAL OAK  02 Ladies ',
        tag:'ROYAL OAK  02',
        price:17032,
        inCart:0
    },
    {
        name:'ROYAL OAK  03 Ladies ',
        tag:'ROYAL OAK  03',
        price:17987,
        inCart:0
    },
    {
        name:'ROYAL OAK  04 Ladies ',
        tag:'ROYAL OAK  04',
        price:17632,
        inCart:0
    },
    {
        name:'ROYAL OAK  05 Ladies ',
        tag:'ROYAL OAK  05',
        price:15532,
        inCart:0
    },
    {
        name:'ROYAL OAK  06 Ladies ',
        tag:'ROYAL OAK  06',
        price:25632,
        inCart:0
    },
    {
        name:'ROYAL OAK  07 Ladies ',
        tag:'ROYAL OAK  07',
        price:15002,
        inCart:0
    },
    {
        name:'ROYAL OAK  08 Ladies ',
        tag:'ROYAL OAK  08',
        price:15002,
        inCart:0
    },
//QUARTS
    {
        name:'QUARTZ 01 Ladies ',
        tag:'QUARTZ 01',
        price:55132,
        inCart:0
    },
    {
        name:'QUARTZ 02 Ladies ',
        tag:'QUARTZ 02',
        price:15532,
        inCart:0
    },
    {
        name:'QUARTZ 03 Ladies ',
        tag:'QUARTZ 03',
        price:62532,
        inCart:0
    },
    {
        name:'QUARTZ 04 Ladies ',
        tag:'QUARTZ 04',
        price:115532,
        inCart:0
    },
    {
        name:'QUARTZ 05 Ladies ',
        tag:'QUARTZ 05',
        price:125532,
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
            <img src="./AP/AP ladies/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
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