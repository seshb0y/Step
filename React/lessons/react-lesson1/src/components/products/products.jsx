// import React from "react"

import ProductsItem from "../productsItem/productsItem";
import style from "./Products.module.css"

const products = [
  {
    id: 1,
    title: "Iphone X",
    description: "info",
    price: "7222.4$",
  },
  {
    id: 2,
    title: "Iphone 5",
    description: "info",
    price: "72$",
  },
  {
    id: 3,
    title: "Iphone 7",
    description: "info",
    price: "7512$",
  },
  {
    id: 4,
    title: "Iphone 6",
    description: "info",
    price: "72421$",
  },
  {
    id: 5,
    title: "Iphone 9",
    description: "info",
    price: "7523$",
  },
];

const Products = () => {
  return (
    <section className={style.container}>
      <ul className={style.title}>
        {products.map((product) => {
          console.log(product);
          return <ProductsItem key={product.id} product={product} />;
        })}
      </ul>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        excepturi suscipit earum optio blanditiis alias ipsum voluptatem
        possimus nisi ducimus, animi saepe nam deleniti rerum rem. Atque
        perspiciatis reprehenderit eveniet!
      </p>
    </section>
  );
};

export default Products;
