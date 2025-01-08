import React from 'react'
import { Link } from 'react-router-dom'

const productsData = [
    {
        id: '1',
        title: 'Vacuum cleaner',
        description: 'description of product',
        price: '120'
    },
    {
        id: '1',
        title: 'Vacuum cleaner',
        description: 'description of product',
        price: '17'
    },
    {
        id: '1',
        title: 'Vacuum cleaner',
        description: 'description of product',
        price: '19'
    }
]

const ProductsPage = () => {

  return (
    <div>   
        <div>ProductsPage</div> 
        <ul>
            {productsData.map((element) => {
                return (<Link to={`/products/${element.id}`} key={element.id}>
                    <li >{element.title}</li>
                </Link>)
            })}
        </ul>
    </div>

  )
}

export default ProductsPage