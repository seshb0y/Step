import React from 'react'

interface Props{
    deleteProduct: () => void;
    // rendProduct: () => void;
}

const ShoppingItem: React.FC<Props> = (props) => {
  return (
    // props.rendProduct()
    <button onClick={props.deleteProduct}>Delete</button>
  )
}

export default ShoppingItem