import axios from "axios";

export const Links = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About", path: "/about" },
  { id: 3, title: "Products", path: "/products" },
  { id: 4, title: "Cart", path: "/cart" },
  { id: 5, title: "Admin", path: "/admin" },
];

export const customFetch = axios.create({
  baseURL: "/api/v1",
});

export const sortProducts = (products, prop) => {
  let items = [];

  products.forEach((product) => {
    const item = product[prop];
    if (!items.includes(item)) {
      items.push(item);
    }
  });
  return items;
};

export const ratingStar = (number, rating, handelChange) => {
  const ratingArray = Array.from({ length: number }, (_, index) => index + 1);

  const final = ratingArray.map((item) => {
    // console.log(item === rating);
    // console.log(rating);
    if (item <= rating) {
      // console.log("in");
      return (
        <input
          key={item}
          type="radio"
          name="rating"
          value={item}
          onChange={(e) => handelChange(e)}
          className="mask mask-star-2 bg-orange-400"
          checked
        />
      );
    } else {
      return;
    }
  });

  return final;
};

export const modifyServerData = (rawData) => {
  // console.log(rawData)
  if(!rawData){
    return null
  }

  let cartItems = rawData.cartItems.map(item => {
    let itemWithOutProduct = {...item}
    delete itemWithOutProduct.product
    let product = item.product

    return {...itemWithOutProduct, ...product, serverCartId: item._id}

  })



  let cartTotal = cartItems.reduce((total, item) => {

    total += (item.amount)*(item.price)
    
    return total
  }, 0)

  let numItemsInCart = cartItems.reduce((total, item) => {

    total += (item.amount)
    
    return total
  }, 0)

  const shipping = 500
  const tax = 0.2*cartTotal
  const orderTotal = cartTotal + shipping + tax


  return {cartItems, cartTotal, numItemsInCart, shipping, tax, orderTotal}
  
}

export const sendLocalToServer = async (items) => {

  for (let item of items){
    console.log(item.name)
    const {_id:product, amount} = item
    try {
      await customFetch.post('/cart', {amount, product})
      
    } catch (error) {
      return error?.response?.data?.msg
    }
  }
}

export const giveNumbersArray = (givenLength) => {
  return Array.from({length: givenLength}, (_,i) => i+1)
}

