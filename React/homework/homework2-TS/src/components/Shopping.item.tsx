import React from 'react'

interface Props{
    // deleteProduct: () => void;
    rendProduct: () => React.ReactNode;
}

const ShoppingItem: React.FC<Props> = ({rendProduct}) => {
  return (
    <div>
      {rendProduct()}
    </div>
  )
}

export default ShoppingItem