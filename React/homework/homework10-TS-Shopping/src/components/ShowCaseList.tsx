import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../redux/store'
import { addProduct, deleteProduct, moveProduct } from '../redux/action';

const ProductsList = () => {

    const [productId, setProductId] = useState(6)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        describe: '',
        amount: '',
    })

    const dispatch = useDispatch();

    const showCase = useSelector((state: AppState) => state.showCase);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const product = {
            id: productId,
            ...formData,
            price: Number(formData.price),
            amount: Number(formData.amount),
            status: false
        }
        dispatch(addProduct(product))
        setProductId(+1)
        setFormData({
            name: '',
            price: '',
            category: '',
            describe: '',
            amount: '',
        });
    }

    const handleDeleteProduct = (id: number) => {
        dispatch(deleteProduct({id}))
    }

    const handleAddToBasket = (id: number, status: boolean) => {
        dispatch(moveProduct({id, status: !status}))
    }

  return (
    <div>
        <ul>
            {
                showCase.filter((product) => product.amount >= 1).map((product) => (
                    <li key={product.id}>
                        {product.name}
                        <p>Price: {product.price}$</p>
                        <div>
                            <p>{product.category}</p>
                            <p>{product.describe}</p>
                            <p>Amount: {product.amount}</p>
                        </div>
                        <button onClick={() => handleAddToBasket(product.id, product.status)} >Add to basket</button>
                        <button onClick={()=>handleDeleteProduct(product.id)}>Delete product</button>
                    </li>
                ))
            }
        </ul>
        <form action="" onSubmit={handleAddProduct}>
            <input name='name' type="text" value={formData.name} onChange={handleChange}  placeholder='name'/>
            <input name='price' type="text" value={formData.price}  onChange={handleChange} placeholder='price'/>
            <input name='category' type="text" value={formData.category}  onChange={handleChange} placeholder='category'/>
            <input name='describe' type="text" value={formData.describe}  onChange={handleChange} placeholder='describe'/>
            <input name='amount' type="text" value={formData.amount}  onChange={handleChange} placeholder='amount'/>
            <button>Add</button>
        </form>
    </div>
  )
}

export default ProductsList