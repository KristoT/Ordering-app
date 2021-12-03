import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItems = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCart = state.items[existingCartItems];

    let updatedItems;
    if (existingCart) {
      const updatedItem = {
        ...existingCart,
        amount: existingCart.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItems] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItems = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCart = state.items[existingCartItems];
    const updatedTotalAmount = state.totalAmount - existingCart.price;
    let updatedItems;
    if (existingCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingCart, amount: existingCart.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItems] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
