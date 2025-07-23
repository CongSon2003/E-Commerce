/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import path from 'ultils/path'
import { apiAddVarriantProduct, apigetOneProduct } from '../../apis'
import { useForm } from 'react-hook-form'
import { fileToBase64 } from 'ultils/helper'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
const ProductVarriantions = () => {
  const navigation = useNavigate();
  const { productId } = useParams();
  const [ currentProduct, setCurrentProduct ] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, formState : { errors }, reset ,watch} = useForm();
  const [previewImage, setpreviewImage] = useState({
    thumb : '',
    images : []
  });
  const handleOnCancelUpdateProduct = () => {
    navigation(`/admin/${path.MANAGER_PRODUCTS_URL}`)
  }
  useEffect(() => {
    const fetchApiGetOneProduct = async (productId) => {
      const result = await apigetOneProduct(productId);
      if (result.success) { 
        console.log(result);
        setCurrentProduct(result.response);
      }
    }
    fetchApiGetOneProduct(productId)
  },[productId])
  const onSubmit = async (data) => {
    // for (item of )
    if (data.color.toString() === currentProduct.color.toString()) {
      Swal.fire({
        title : 'Oop!',
        text : 'Color does not change',
        icon : 'info'
      })
      return
    } else {
      setLoading(true)
      const formData = new FormData();
      for (const element of Object.entries(data)) {
        formData.append(element[0], element[1]);
      }
      if (data.thumb) {
        formData.delete('thumb');
        formData.append('thumb', data.thumb[0])
      }
      if (data.images) {
        formData.delete('images');
        for (const image of data.images) {
          formData.append('images', image);
        }
      }
      const result = await apiAddVarriantProduct(formData, productId);
      setLoading(false);
      if (result.success) {
        toast.success(result.message || 'Product has been added successfully!')
        reset({
          color : '',
          price : '',
        });
        setpreviewImage({thumb : '', images : []})
      }
    }
    
  }
  const handlePriviewThumb = async (file) => {
    if (!file) {
      setpreviewImage(prev => ({...prev, thumb : ''}));
      return;
    }
    const base64Thumb = await fileToBase64(file);
    setpreviewImage(prev => ({...prev, thumb : base64Thumb}));
  }
  const handlePriviewImages = async (files) => {
    const base64Images = await Promise.all((Array.from(files)).map(file => fileToBase64(file)))
    setpreviewImage(prev => ({...prev, images : base64Images}))
  }
  useEffect(() => {
    if (watch('thumb')?.length > 0) {
      console.log(watch('thumb'));
      handlePriviewThumb(watch('thumb')[0])
    }
    if (watch('images')?.length > 0) {
      handlePriviewImages(watch('images'))
    }
  }, [watch('thumb'), watch('images')])
  useEffect(() => {
    if (currentProduct) { 
      reset({
        title : currentProduct.title || '',
        color : currentProduct.color || '',
        price : currentProduct.price || '',
      })
    }
  },[currentProduct])
  console.log();
  return (
    <div className='p-4 relative w-full h-full flex flex-col'>
      <header className='w-full border-b p-2 mb-6 flex items-center gap-2 justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-medium uppercase'>Customize product variations : </h1>
          <span className='text-2xl text-gray-700'>{currentProduct?.title || 'null'}</span>
        </div>
        <button type='button' onClick={()=> handleOnCancelUpdateProduct()} className='p-2 bg-main rounded-md text-white'>Back</button>
      </header>
      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-8/12 bg-[#F1EFEC] border p-4 rounded-md shadow-md'>
          <div>
            <label htmlFor='Product-title' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Title</label>
            <input id='Product-title' {...register('title', { required : 'Please enter your product title'})} placeholder='Enter your product title' className='w-full border p-2 rounded-md'/>
            <small className='text-red-500 pl-2'>{errors.title?.message}</small>
          </div>
          <div className='flex w-full gap-2'>
            <div className='flex-1'>
              <label htmlFor='Product-price' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Price</label>
              <input id='Product-price' type='number' {...register('price', { required : 'Please enter your product price'})} className='w-full border p-2 rounded-md' placeholder='Enter your price' />
              <small className='text-red-500'>{errors.price?.message}</small>
            </div>
            <div className='flex-1'>
              <label htmlFor='Product-Color' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Color</label>
              <input type='text' id='Product-Color' {...register('color', { required : 'Please enter your product color'})} className='w-full border p-2 rounded-md' placeholder='Enter your color'/>
              <small className='text-red-500'>{errors.color?.message}</small>
            </div>
          </div>
          <div>
            <label htmlFor='Product-thumb' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>{`Product Thumbnail (${previewImage?.thumb ? 1 : 0} item)`}</label>
            <input type='file' id='Product-thumb' {...register('thumb', { required : 'Please enter your product thumb'})} className='w-full border p-2 rounded-md' />
            <small className='text-red-500 pl-2'>{errors.thumb?.message}</small>
          </div>
          {previewImage.thumb && <div>
            <img src={previewImage.thumb} alt='thumbnail' className='w-1/2 object-contain'/>
          </div>}
          <div>
            <label htmlFor='Product-images' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>{`Product Images (${previewImage.images.length} items)`}</label>
            <input type='file' multiple id='Product-images' {...register('images', { required : 'Please enter your product images'})} className='w-full border p-2 rounded-md' />
            <small className='text-red-500 pl-2'>{errors.images?.message}</small>
          </div>
          <div>
            {(previewImage?.images?.length > 0) && <div className='flex gap-2 flex-wrap'>
              {previewImage?.images?.map((image, index) => (
                <div className='flex' key={index}>
                  <img src={image} alt={`product-${index}`} className='w-[300px] object-contain' />
                </div>
              ))}
            </div>}
          </div>
          {loading ? <button className='bg-main uppercase p-2 text-white rounded-md hover:bg-[#474747] cursor-not-allowed' disabled>Loading...</button> : <button className='bg-main uppercase p-2 text-white rounded-md hover:bg-[#474747]'>Add varriant</button>}
        </form>
      </div>
    </div>
  )
}

export default ProductVarriantions