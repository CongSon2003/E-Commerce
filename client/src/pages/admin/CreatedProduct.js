/* eslint-disable react-hooks/exhaustive-deps */
import { apiCreateProduct } from '../../apis';
import Markdown from 'component/input/Markdown';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { fileToBase64 } from 'ultils/helper';
const CreatedProduct = () => {
  const { categories } = useSelector(state => state.appReducer);
  const [category, setCategory] = useState('');
  const { register, handleSubmit, formState: { errors }, watch} = useForm();
  const [loading, setLoading] = useState(false);
  const [textDescription, setTextDescription] = useState({
    description : ''
  });
  const [previewImage, setPreviewImage] = useState({
    thumb : '',
    images : []
  });
  const [errorTextDescription, setErrorTextDescription] = useState('');
  const handleOnChangeCategory = (e) => {
    setCategory(e.target.value);
  }
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
    const finalData = {...data,...textDescription }
    console.log("finalData", finalData);
    const formData = new FormData();
    for (const key of Object.entries(finalData)) {
      formData.append(key[0], key[1]); 
    }
    if (finalData.thumb) {
      // If thumb is an array, we take the first element
      formData.append('thumb', finalData.thumb[0])
    }
    if (finalData.images && finalData.images.length > 0) {
      console.log(finalData.images);
      for (let image of finalData.images) {
        formData.append('images', image);
      }
    }
    console.log("formData", formData.getAll('thumb'));
    console.log('finalData', finalData);
    const result = await apiCreateProduct(formData);
    setLoading(false);
    console.log(result);
    if (result.success) {
      toast.success('Create product successfully');
      setPreviewImage({
        thumb : '',
        images : []
      })
      setTextDescription({
        description : ''
      });
    } else {
      toast.error(result.message || 'Create product failed');
    }
  }
  const onChangeDescription = useCallback((objectValue) => {
    setTextDescription(objectValue)
  }, [])
  useEffect(() => {
    console.log('watch', watch);
    if (watch('thumb').length > 0) {
      handlePriviewThumb(watch('thumb')[0]);
    }
    if (watch('images').length > 0) {
      handlePriviewImages(watch('images'));
    }
  },[watch('thumb'), watch('images')]);
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
    if (!files || files.length === 0) {
      setPreviewImage(prev => ({...prev, images : []}));
      return;
    }
    const base64Images = await Promise.all(Array.from(files).map(file => fileToBase64(file)));
    setPreviewImage(prev => ({...prev, images : base64Images}));
  }
  return (
    <div className='p-4 relative w-full h-full flex flex-col'>
      <header className='w-full border-b p-2 mb-6'>
        <h1 className='text-2xl font-medium uppercase'>Created Product</h1>
      </header>
      <div className='flex gap-4 w-full h-full justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-8/12 bg-[#FFFCFB] border p-4 rounded-md shadow-md'>
          <div>
            <label htmlFor='Product-title' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Title</label>
            <input id='Product-title' {...register('title', { required : 'Please enter your product title'})} placeholder='Enter your product title' className='w-full border p-2 rounded-md'/>
            <small className='text-red-500 pl-2'>{errors.title?.message}</small>
          </div>
          <div>
            <Markdown  label={'Product Description'} onChangeDescription={onChangeDescription} name={'description'} error={errorTextDescription}/>
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
              <select {...register('category', { required : 'Please enter your category'})} value={category} onChange={handleOnChangeCategory} id='Product-category' className='w-full border p-2 rounded-md'>
                <option value=''>--Select a category--</option>
                {categories && categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.title}</option>
                ))}
              </select>
              <small className='text-red-500 pl-2'>{errors?.category?.message}</small>
            </div>
            <div className='w-1/2'>
              <label htmlFor='Product-brands' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Brands</label>
              <select {...register('brand', {required : 'Please enter your brands'})} id='Product-brands' className='w-full border p-2 rounded-md'>
                <option value=''>--Select a brands--</option>
                {categories && categories.find(el => el._id === category)?.brand?.map((brand,index) => (
                  <option key={index} value={brand}>{brand}</option>))}
              </select>
              <small className='text-red-500 pl-2'>{errors.brands?.message}</small>
            </div>
          </div>
          <div>
            <label htmlFor='Product-thumb' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Thumbnail</label>
            <input type='file' id='Product-thumb' {...register('thumb', { required : 'Please enter your product thumbnail'})} className='w-full border p-2 rounded-md' />
            <small className='text-red-500 pl-2'>{errors.thumb?.message}</small>
          </div>
          {previewImage.thumb && <div>
            <img src={previewImage.thumb} alt='thumbnail' className='w-1/2 object-contain'/>
          </div>}
          <div>
            <label htmlFor='Product-images' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>Product Images</label>
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
          <button type='submit' className='bg-main p-2 rounded-md hover:bg-[#474747] text-white'>{loading ? 'Loading...' : 'Create new product'}</button>
        </form>
      </div>
    </div>
  )
}

export default CreatedProduct