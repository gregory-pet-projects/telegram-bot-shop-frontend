import React, { useState, useCallback, useEffect } from "react";
import "./ProductList.css";
import { ProductItem } from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { getTotalPrice } from "../../service/utils";
import { sendData } from "../../service/fetcher";
import { products } from "../../service/mockedItemsList";

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const sendProductData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    sendData(data);
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", sendProductData);
    return () => {
      tg.offEvent("mainButtonClicked", sendProductData);
    };
  }, [tg, sendProductData]);

  const handleAddToCart = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];
    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item, idx) => (
        <ProductItem
          key={idx}
          product={item}
          onAdd={handleAddToCart}
          className={"item"}
        />
      ))}
    </div>
  );
};
