// import React from 'react'




const ProductsItem = (props) => {
    console.log(props)
  return (
    <li>
        <h4>{props.product.title}</h4>
        <p>{props.product.description}</p>
        <p> {props.product.price}</p>
    </li>
  )
}

export default ProductsItem