let carts = document.querySelectorAll('.add-cart');

let products = [
    //classic 45,42,38,33MM
   {
       name:'TITANIUM CLASSIC',
       tag:'TITANIUM CLASSIC',
       price:23213,
       inCart:0
   },
   {
       name:'TITANIUM OPALIN',
       tag:'TITANIUM OPALIN',
       price:29300,
       inCart:0
   },
   {
    name:'BLUE TITIANIUM',
    tag:'BLUE TITIANIUM',
    price:29300,
    inCart:0
   },
   {
    name:'TITIANIUM GREEN',
    tag:'TITIANIUM GREEN',
    price:27839,
    inCart:0
   },
   {
    name:'TITIANIUM KING GOLD',
    tag:'TITIANIUM KING GOLD',
    price:30800,
    inCart:0
   },
   {
    name:'LING GOLD',
    tag:'LING GOLD',
    price:35000,
    inCart:0
   },
   {
    name:'RACING GREY TITIANIUM',
    tag:'RACING GREY TITIANIUM',
    price:34350,
    inCart:0
   },

   //CHRONGRAPH 45,42
   {
    name:'CHRONOGRAPH TITANIUM',
    tag:'CHRONOGRAPH TITANIUM',
    price:33920,
    inCart:0
   },
   {
    name:'CHRONOGRAPH TITANIUM OPALIN',
    tag:'CHRONOGRAPH TITANIUM OPALIN',
    price:29070,
    inCart:0
   },
   {
    name:'BLIUE CHRONOGRAPH  TITIANIUM',
    tag:'BLIUE CHRONOGRAPH  TITIANIUM',
    price:23299,
    inCart:0
   },
   {
    name:'RACING GREY CHRONOGRAPH  TITANIUM',
    tag:'RACING GREY CHRONOGRAPH  TITANIUM',
    price:22299,
    inCart:0
   },
   {
    name:'CERAMIC BLUE CHRONOGRAPH',
    tag:'CERAMIC BLUE CHRONOGRAPH',
    price:31299,
    inCart:0
   },
   {
    name:'CHRONOGRAPH BLACK MAGIC',
    tag:'CHRONOGRAPH BLACK MAGIC',
    price:25200,
    inCart:0
   },
   {
    name:'CHRONOGRAPH CHELSE',
    tag:'CHRONOGRAPH CHELSE',
    price:24800,
    inCart:0
   },
   {
    name:'CHRONOGRAPH TITANIUM BRACELET',
    tag:'CHRONOGRAPH TITANIUM BRACELET',
    price:34800,
    inCart:0
   },
   {
    name:'CHRONOGRAPH  TITIANUM DIAMOND',
    tag:'CHRONOGRAPH  TITIANUM DIAMOND',
    price:23820,
    inCart:0
   },
   {
    name:'CHRONOGRAPH TITANIUM PAVE',
    tag:'CHRONOGRAPH TITANIUM PAVE',
    price:28322,
    inCart:0
   },
   {
    name:'CHRONOGRAPH  KING GOLD DIAMOND',
    tag:'CHRONOGRAPH  KING GOLD DIAMOND',
    price:34800,
    inCart:0
   },
   //AEROFUSION 45MM
   {
    name:'AEROFUSON TITANIUM',
    tag:'AEROFUSON TITANIUM',
    price:32100,
    inCart:0
   },
   {
    name:'AEROFUSON KING GOLD',
    tag:'AEROFUSON KING GOLD',
    price:21300,
    inCart:0
   },
   {
    name:'AEROFUSON CHRONOGR UEFA',
    tag:'AEROFUSON CHRONOGR UEFA',
    price:21900,
    inCart:0
   },
    {
    name:'AEROFUSON BLACK MAGIC',
    tag:'AEROFUSON BLACK MAGIC',
    price:22310,
    inCart:0
   },
   //ORLINSKI
   {
    name:'ORLINSKI KING GOLD',
    tag:'ORLINSKI KING GOLD',
    price:17500,
    inCart:0
   },
   {
    name:'ORLINSKI TITANIUM ALTERNATIVE',
    tag:'ORLINSKI TITANIUM ALTERNATIVE',
    price:22500,
    inCart:0
   },
   {
    name:'ORLINSKI TITANIUM PAVE',
    tag:'ORLINSKI TITANIUM PAVE',
    price:17600,
    inCart:0
   },
   {
    name:'ORLINSKI KING GOLD ALTERNATIVE',
    tag:'ORLINSKI KING GOLD ALTERNATIVE',
    price:37500,
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
            <img src="./HUBLOT/HuBlot Men/${item.tag}.png" alt="MRG-B1000D-1A" style="width: 25%">
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