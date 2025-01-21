import React, { ChangeEvent, FormEvent, useState } from 'react'
import { v4 } from "uuid"
import Header from '../(components)/Header';

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number
}

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void
}

const CreateProductModal = ({
    isOpen,
    onClose,
    onCreate
}: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }
    console.log("product Id", formData.productId)
    if (!isOpen) return null;

    const labelCssStyles = `block text-sm text-gray-700 font-medium`
    const inputCssStyles = `block w-full mb-2 p-2 border-gray-500 border-2 rounded-md`

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full z-20'>
            <div className='relative top-20 mx-auto p-5  border w-96 shadow-lg rounded-md bg-white'>
                <Header name='Create New Product' />
                <form onSubmit={handleSubmit} className='mt-5' >

                    <label
                        htmlFor='productName'
                        className={labelCssStyles}
                    >
                        Product Name
                    </label>
                    <input
                        type='text'
                        name="name"
                        placeholder='Name'
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />

                    <label
                        htmlFor='productPrice'
                        className={labelCssStyles}
                    >
                        Price
                    </label>
                    <input
                        type='number'
                        name="price"
                        placeholder='Price'
                        onChange={handleChange}
                        value={formData.price}
                        className={inputCssStyles}
                        required
                    />

                    <label
                        htmlFor='stockQuantity'
                        className={labelCssStyles}
                    >
                        Products In Stock
                    </label>
                    <input
                        type='number'
                        name="stockQuantity"
                        placeholder='Enter The Number Of Products Remaining'
                        onChange={handleChange}
                        value={formData.stockQuantity}
                        className={inputCssStyles}
                        required
                    />

                    <label
                        htmlFor='rating'
                        className={labelCssStyles}
                    >
                        Rating
                    </label>
                    <input
                        type='number'
                        name="rating"
                        placeholder='Rating'
                        onChange={handleChange}
                        value={formData.rating}
                        className={inputCssStyles}
                        required
                    />

                    <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' type='submit'>
                        Create Product
                    </button>
                    <button className='ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700' type='button' onClick={onClose} >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProductModal 