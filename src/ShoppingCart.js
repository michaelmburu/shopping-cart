import { useState } from 'react'

const items = [{
  name: 'apple',
  price: 0.39
}, {
  name: 'banana',
  price: 0.79
}, {
  name: 'cherry tomatoes',
  price: 3.99
}]

function ShoppingCart () {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    //create copy of cart
    const cartCopy = [...cart]

    //check if item is in cart
    const cartItem = cartCopy.find(i => item.name === i.name)
    if(cartItem){
        cartItem.quantity += 1
        setCart(cartCopy)
    } else {
        //If item is not in cart append item to cart array
        setCart(prevCart => [...prevCart, {...item, quantity: 1}])
    }
  }

  const increase = (name) => {
    //create copy of cart
    const cartCopy = [...cart]

    //Check if item is in cart
    const cartItem = cartCopy.find((i) => name === i.name)

    //Increment
    cartItem.quantity += 1

    //set cart
    setCart(cartCopy)
}

const decrease = (name) => {
    //create copy of cat
    let cartCopy = [...cart]

    //Check if item is in cart
    const cartItem = cartCopy.find((i) => name === i.name);

    //Check if cartItem is not less than 1
    if(cartItem.quantity > 1) {

        // Decrement
        cartItem.quantity -= 1;

        //Set cart
        setCart(cartCopy)
    } else {
        //Remove item from cart if its the only one
        cartCopy = cartCopy.filter(i => i.name !== name)

        //Set cart
        setCart(cartCopy)
    }
}


  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className='cart'>
        <div className='items'>
          <h2>Items</h2>
          {items.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>)
          )}
        </div>
        <div>
          <h2>Cart</h2>
          {cart.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>
                <button onClick={() => decrease(item.name)}>-</button>
                {item.quantity}
                <button onClick={() => increase(item.name)}>+</button>
              </p>
              <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='total'>
        <h2>Total: ${cart.reduce((acc, currentItem) =>  acc + (currentItem.quantity * currentItem.price) ,0).toFixed(2) }
        </h2>
      
      </div>
    </div>
  )
}

export default ShoppingCart