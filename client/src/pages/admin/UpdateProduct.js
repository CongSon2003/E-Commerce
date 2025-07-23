/* eslint-disable react-hooks/exhaustive-deps */
import { apigetOneProduct, apiUpdateProduct } from '../../apis';
import Markdown from 'component/input/Markdown';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fileToBase64 } from 'ultils/helper';
import path from 'ultils/path';
const CreatedProduct = () => {
  const { categories } = useSelector(state => state.appReducer);
  const { register, handleSubmit, formState: { errors }, watch, reset} = useForm();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [brand, setBrand] = useState(currentProduct?.brand);
  const [loading, setLoading] = useState(false);
  const { productId }  = useParams();
  const navigation = useNavigate();
  const [textDescription, setTextDescription] = useState({
    description : ''
  });
  const [previewImage, setPreviewImage] = useState({
    thumb : '',
    images : []
  });
  const [errorTextDescription, setErrorTextDescription] = useState('');
  const onSubmit = async (data) => {
    setLoading(true);
    if (data.category) {
      data.category = categories.find(el => el._id === data.category)?.title;
    }
    if (textDescription.description === '') {
      setErrorTextDescription('Please enter your product description');
      return; 
    } else {
      setErrorTextDescription('');
      data.description = textDescription.description;
    }
    let finalData = { }
    const formData = new FormData();
    if (data?.thumb?.length > 0 || data?.images?.length > 0) { 
      if (data.thumb && !data.images) {
        finalData = {...data, ...textDescription, images : [...previewImage.images]}
      }
      if (data.images && !data.thumb) {
        finalData = {...data, ...textDescription, thumb : [previewImage.thumb]}
      }
      if (!data.images && !data.thumb) {
        delete data.images;
        delete data.thumb;
        finalData = { ...data,...textDescription, ...previewImage}
      }
      if (data.images && data.thumb ) {
        finalData = {...data, ...textDescription}
      }
    } else {
      delete data.images;
      delete data.thumb;
      finalData = { ...data,...textDescription, ...previewImage}
    }
    for (const key of Object.entries(finalData)) {
      formData.append(key[0], key[1]); 
    }
    if (finalData.thumb) {
      formData.delete('thumb')
      // If thumb is an array, we take the first element
      formData.append('thumb', typeof finalData.thumb === 'string' ? finalData.thumb : finalData.thumb[0])
    }
    if (finalData.color) {
      formData.delete('color')
      formData.append('color', finalData.color.toUpperCase())
    }
    if (finalData?.images && finalData?.images?.length > 0) {
      formData.delete('images')
      for (let image of finalData.images) {
        formData.append('images', image);
      }
    }
    const result = await apiUpdateProduct(productId,formData);
    setLoading(false);

    if (result?.success) {
      toast.success('Update product successfully');
    } else {
      toast.error(result?.message || 'Update product failed');
    }
  }
  const onChangeDescription = useCallback((objectValue) => {
    setTextDescription(objectValue)
  }, [])
  useEffect(() => {
    if (watch('thumb')?.length > 0) {
      handlePriviewThumb(watch('thumb')[0]);
    }
    if (watch('images')?.length > 0) {
      handlePriviewImages(watch('images'));
    }
  },[watch('thumb'), watch('images')]);
  useEffect(() => {
    const fetchApiGetProduct = async (productId) => {
      const result = await apigetOneProduct(productId);
      if (result.success) {
        setCurrentProduct(result.response);
      }
    }
    fetchApiGetProduct(productId);
  },[productId]);
  useEffect(() => {
    if (currentProduct) {
      setBrand(currentProduct.brand);
      setTimeout(() => {
        reset({
          title : currentProduct.title || '',
          description : currentProduct.description || '',
          price : currentProduct.price || '',
          quantity : currentProduct.quantity || '',
          color : currentProduct.color || '',
          category : categories.find(categr => categr.title?.toLowerCase() === currentProduct.category?.toLowerCase())?._id || '',
          brand : currentProduct.brand || '',
        })  
      },1000)
      setPreviewImage({
        thumb : currentProduct.thumb,
        images : currentProduct.images
      })
      setTextDescription(prev => ({...prev, description : typeof currentProduct.description === 'object' ? currentProduct.description?.join(', ') : currentProduct?.description}))
    }
  },[currentProduct])
  const handlePriviewThumb = async (file) => {
    if (!file) {
      setPreviewImage(prev => ({...prev, thumb : ''}));
      return;
    }
    const base64Thumb = await fileToBase64(file);
    setPreviewImage(prev => ({...prev, thumb : base64Thumb}));
  }
  const handlePriviewImages = async (files) => {
    // Convert FileList to Array
    if (!files || files?.length === 0) {
      setPreviewImage(prev => ({...prev, images : []}));
      return;
    }
    const base64Images = await Promise.all(Array.from(files).map(file => fileToBase64(file)));
    setPreviewImage(prev => ({...prev, images : base64Images}));
  }
  const handleOnchangeBrand = (e) => {
    setBrand(e.target.value);
  }
  const handleOnCancelUpdateProduct = () => {
    navigation(`/admin/${path.MANAGER_PRODUCTS_URL}`)
  }
  return (
    <div className='p-4 relative w-full h-full flex flex-col'>
      <header className='w-full border-b p-2 mb-6 flex items-center gap-2 justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-medium uppercase'>Update Product : </h1>
          <span className='text-2xl text-gray-700'>{currentProduct?.title || 'null'}</span>
        </div>
        <button type='button' onClick={()=> handleOnCancelUpdateProduct()} className='p-2 bg-main rounded-md text-white'>Cancel</button>
      </header>
      <div className='flex gap-4 w-full h-full justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-8/12 bg-[#F1EFEC] border p-4 rounded-md shadow-md'>
          <div>
            <label htmlFor='Product-title' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Title</label>
            <input id='Product-title' {...register('title', { required : 'Please enter your product title'})} placeholder='Enter your product title' className='w-full border p-2 rounded-md'/>
            <small className='text-red-500 pl-2'>{errors.title?.message}</small>
          </div>
          <div>
            <Markdown label={'Product Description'} initialValue={textDescription.description} onChangeDescription={onChangeDescription} name={'description'} error={errorTextDescription}/>
          </div>
          <div className='flex w-full gap-2'>
            <div className='flex-1'>
              <label htmlFor='Product-price' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Price</label>
              <input id='Product-price' type='number' {...register('price', { required : 'Please enter your product price'})} className='w-full border p-2 rounded-md' placeholder='Enter your price' />
              <small className='text-red-500'>{errors.price?.message}</small>
            </div>
            <div className='flex-1'>
              <label htmlFor='Product-quantity' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Quantity</label>
              <input type='number' id='Product-quantity' {...register('quantity', { required : 'Please enter your product quantity'})} className='w-full border p-2 rounded-md' placeholder='Enter your quantity'/>
              <small className='text-red-500'>{errors.quantity?.message}</small>
            </div>
            <div className='flex-1'>
              <label htmlFor='Product-Color' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Color</label>
              <input type='text' id='Product-Color' {...register('color', { required : 'Please enter your product color'})} className='w-full border p-2 rounded-md' placeholder='Enter your color'/>
              <small className='text-red-500'>{errors.color?.message}</small>
            </div>
          </div>
          <div className='flex w-full justify-between gap-2'>
            <div className='w-1/2'>
              <label htmlFor='Product-category' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Category</label>
              <select {...register('category', { required : 'Please enter your category'})} id='Product-category' className='w-full border p-2 rounded-md'>
                <option value=''>--Select a category--</option>
                {categories && categories.map((category) => (
                  <option key={category?._id} value={category?._id}>{category.title}</option>
                ))}
              </select>
              <small className='text-red-500 pl-2'>{errors?.category?.message}</small>
            </div>
            <div className='w-1/2'>
              <label htmlFor='Product-brands' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Brands</label>
              <select {...register('brand', {required : 'Please enter your brands'})} value={brand} onChange={(e) => handleOnchangeBrand(e)} id='Product-brands' className='w-full border p-2 rounded-md'>
                <option value=''>--Select a brands--</option>
                {categories && categories.find(el => el?._id === watch('category'))?.brand?.map((brand,index) => (
                  <option key={index} value={brand}>{brand}</option>))}
              </select>
              <small className='text-red-500 pl-2'>{errors.brands?.message}</small>
            </div>
          </div>
          <div>
            <label htmlFor='Product-thumb' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>{`Product Thumbnail (${previewImage?.thumb ? 1 : 0} item)`}</label>
            <input type='file' id='Product-thumb' {...register('thumb')} className='w-full border p-2 rounded-md' />
            <small className='text-red-500 pl-2'>{errors.thumb?.message}</small>
          </div>
          {previewImage.thumb && <div>
            <img src={previewImage.thumb} alt='thumbnail' className='w-1/2 object-contain'/>
          </div>}
          <div>
            <label htmlFor='Product-images' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>{`Product Images (${previewImage.images.length} items)`}</label>
            <input type='file' multiple id='Product-images' {...register('images')} className='w-full border p-2 rounded-md' />
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
          {
            loading ? <button type='submit' className={`bg-main p-2 rounded-md hover:bg-[#474747] text-white cursor-not-allowed`} disabled>Loading...</button> : 
              <button type='submit' className={`bg-main p-2 rounded-md hover:bg-[#474747] text-white`}>Product Updates</button>
          }
          <button type='submit' className={`bg-main p-2 rounded-md hover:bg-[#474747] text-white`}>Product Updates</button>
        </form>
      </div>
    </div>
  )
}

export default CreatedProduct