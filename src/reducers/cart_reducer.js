import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => {
      if (item.id === id + color) {
        return item;
      }
    });

    if (tempItem) {
      console.log(state.cart); //
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => {
      if (item.id !== action.payload) {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    if (action.payload.value === "inc") {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.amount++;
          if (item.amount > item.max) {
            item.amount = item.max;
          }
          return item;
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    }
    if (action.payload.value === "dec") {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.amount--;
          if (item.amount <= 0) {
            item.amount = 1;
          }
          return item;
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const cartTotal = state.cart.reduce(
      (total, cartItem) => {
        total.total_items += cartItem.amount;
        total.total_amount += cartItem.amount * cartItem.price;

        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    const { total_items, total_amount } = cartTotal;

    return { ...state, total_amount, total_items };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
