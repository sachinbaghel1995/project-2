import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addProductHandler = async (item, size) => {
    const existingItemIndex = products.findIndex(
      (ele) => ele.name === item.name
    );
    const existingItem = products[existingItemIndex];
    if (existingItem) {
      let updatedItem;
      if (size === "l") {
        let quantityL = existingItem.quantityL ? existingItem.quantityL : 0;
        updatedItem = {
          ...existingItem,
          quantityL: Number(quantityL) + 1,
        };
      } else if (size === "m") {
        let quantityM = existingItem.quantityM ? existingItem.quantityM : 0;
        updatedItem = {
          ...existingItem,
          quantityM: Number(quantityM) + 1,
        };
      } else {
        let quantityS = existingItem.quantityS ? existingItem.quantityS : 0;
        updatedItem = {
          ...existingItem,
          quantityS: Number(quantityS) + 1,
        };
      }
      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts[existingItemIndex] = updatedItem;
        return updatedProducts;
      });
    } else {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.concat(item);
        return updatedProducts;
      });
    }
    setTotalAmount((prev) => {
      prev = prev + Number(item.price);
      return prev;
    });
  };

  console.log(products);
  const cartContext = {
    products: products,
    totalAmount: totalAmount,
    addProduct: addProductHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
