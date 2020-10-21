import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/cart-item";
import {ADD_ORDER} from "../actions/orders";
import {DELETE_PRODUCT} from "../actions/products";

const initialState={
  items: {},
  totalAmount: 0
};
export default (state=initialState,action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct=action.product;
            const productPrice=addedProduct.price;
            const prodTitle=addedProduct.title;
            let updatedoOrNewCartItem;
             if(state.items[addedProduct.id])
             {
                 //already in the cart
                 updatedoOrNewCartItem=new CartItem(
                     state.items[addedProduct.id].quantity+1,
                     productPrice,
                     prodTitle,
                     state.items[addedProduct.id].sum+productPrice
                 )
             }
             else
             {
                 updatedoOrNewCartItem=new CartItem(1,productPrice,prodTitle,productPrice);

             }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedoOrNewCartItem},
                totalAmount: state.totalAmount + productPrice
            }
        case REMOVE_FROM_CART:
            const selectedCartItem=state.items[action.pid];
           const currentQty=state.items[action.pid].quantity;
           let updatedCartItems;
           if(currentQty>1)
           {
               const updatedCartItem=new CartItem(
                   selectedCartItem.quantity-1,
                   selectedCartItem.productPrice,
                   selectedCartItem.productTitle,
                   selectedCartItem.sum-selectedCartItem.productPrice
               );
               updatedCartItems={...state.items,[action.pid]:updatedCartItem}
               //need to reduce it, not erase it
           }
           else
           {
               updatedCartItems={...state.items};
               delete updatedCartItems[action.pid];
           }
           return {
               ...state,
               items:updatedCartItems,
               totalAmount: state.totalAmount-selectedCartItem.productPrice
           }
        case ADD_ORDER:
           return initialState
        case DELETE_PRODUCT:
            if(!state.items[action.pid])
            {
                return state;
            }
            const updatedItems={...state.items};
            const itemTotal=state.items[action.pid].sum;
           delete updatedItems[action.pid];
            return {
                ...state,
                items:updatedItems,
                totalAmount: state.totalAmount-itemTotal
            }

    }
    return state
}