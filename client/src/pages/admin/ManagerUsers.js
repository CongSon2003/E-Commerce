import { roles } from 'ultils/contant';
import { apiGetUsers } from '../../apis';
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { TiDelete } from "react-icons/ti";
import { useForm } from 'react-hook-form';
import { apiUpdateUserAdmin } from '../../apis';
import Swal from 'sweetalert2';
// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const ManagerUsers = () => {
  const [users, setUsers] = useState(null);
  const { handleSubmit, formState : { errors }, register, reset } = useForm();
  const [valueSearch, setValueSearch] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEditUser, setDataEditUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = users?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users?.length / itemsPerPage);
  useEffect(() => {
    const fetchApiGetUsers = async (query) => {
      const result = await apiGetUsers(query);
      if (result?.success) {
        setUsers(result.response)
      }
    }
    fetchApiGetUsers({email: valueSearch.trim()});
  },[valueSearch, isUpdate])
  const renderIsUpdate = useCallback(() => {
    setIsUpdate(!isUpdate);
  }, [isUpdate]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  const handleSubmitEditUser = async (data) => {
    
    console.log("data", data);
    const result = await apiUpdateUserAdmin(data, dataEditUser?._id);
    if (result?.success) {
      setIsEdit(false);
      renderIsUpdate();
      setDataEditUser(null);
      setIsBlocked(false);
      Swal.fire({
        title: "Good job!",
        text: "Update successfully",
        icon: "success" 
      });
    } 
  }
  const handleEditUser = async (user) => {
    setDataEditUser(user);
    setIsEdit(true);
  }
  const handleCloseEdit = () => {
    setIsEdit(false);
    setDataEditUser(null);
    setIsBlocked(false);
  }
  console.log(isBlocked);
  console.log("dataEditUser", dataEditUser);
  useEffect(() => {
    if (dataEditUser) {
      setIsBlocked(dataEditUser?.isBlocked);
    }
    reset({ 
    firstname : dataEditUser?.firstname || '',
    lastname : dataEditUser?.lastname || '',
    email : dataEditUser?.email || '',
    phone : dataEditUser?.mobile || '',
    isBlocked : dataEditUser?.isBlocked || false,
    role : dataEditUser?.role || '1975',  
  })
  }, [dataEditUser, reset])
  return (
    <div className='p-4 relative w-full h-full flex flex-col'>
      <header className='w-full border-b p-2 mb-6'>
        <h1 className='text-2xl font-medium uppercase'> Manager users</h1>
      </header>
      <div className='w-full flex flex-col'>
        <div className='flex justify-end items-center gap-4 mb-4'>
          <input placeholder='Search by email' id='SearchByEmail' value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} className='p-2 w-1/3 border-2 border-solid'/>
        </div>
        <table className="table-auto w-full text-left">
          <thead className='bg-gray-700 text-white border border-gray-500'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Full name</th>
              <th className='px-4 py-2'>First name</th>
              <th className='px-4 py-2'>Last name</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Created at</th>
              <th className='px-4 py-2'>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((user,index) => (
              <tr key={user._id} className='border border-gray-500'>
                <td className='px-4 py-2'>{index + 1}</td>
                <td className='px-4 py-2'>{user?.email}</td>
                <td className='px-4 py-2'>{`${user?.firstname} ${user?.lastname}`}</td>
                <td className='px-4 py-2'>{user?.firstname}</td>
                <td className='px-4 py-2'>{user?.lastname}</td>
                <td className='px-4 py-2'>{user?.mobile}</td>
                <td className={`${user?.isBlocked ? 'blocked text-red-500' : 'active text-green-500'} px-4 py-2`}>{user?.isBlocked ? 'blocked' : 'active'}</td>
                <td className='px-4 py-2'>{roles?.find(role => role.code === user.role).value}</td>
                <td className='px-4 py-2'>{moment(user?.createdAt).format('DD/MM/YYYY')}</td>
                <td className='px-4 py-2 flex items-center gap-2'>
                  <span onClick={() => handleEditUser(user)} className='cursor-pointer hover:text-red-500 hover:underline'>Edit</span>
                  <span className='cursor-pointer hover:text-red-500 hover:underline'>Delete</span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      <div className='w-full flex justify-center items-center absolute bottom-14 left-0 right-0'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          className='flex items-center gap-3'
          pageClassName = ""
          pageLinkClassName = "w-full h-full py-[8px] px-[14px] border rounded hover:bg-gray-200 hover:text-black"
          breakClassName=''
          nextClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
          previousClassName='bg-gray-200 py-[6px] px-[12px] rounded'
          activeClassName = ""
          activeLinkClassName = "bg-main text-white rounded hover:bg-main hover:text-white border-none"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
      {isEdit && <div className='bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center'>
        <div className='bg-white text-black w-1/3 rounded-md'>
          <div className='flex justify-between items-center p-4 border-b'>
            <h1 className='text-gray-500 uppercase'>Update</h1>
            <TiDelete onClick={() => setIsEdit(false)} size={25} className='cursor-pointer'/>
          </div>
          <div className='p-4'>
            <form method='put' onSubmit={handleSubmit(handleSubmitEditUser)} className='flex flex-col gap-5' >
              <div className='flex flex-col gap-5'>
                <div className='flex items-center w-full relative'>
                  <label htmlFor='firstname' className='text-gray-500 inline-block w-[20%]'>First name</label>
                  <input type='text' id='firstname' {...register('firstname', { required : 'Please enter your first name'})} autoComplete="given-name" className='w-full p-2 border-2 border-solid' />
                  <small className='text-red-500 absolute bottom-[-20px] right-0'>{errors?.firstname?.message}</small>
                </div>
                <div className='flex items-center w-full relative'>
                  <label htmlFor='lastname' className='text-gray-500 inline-block w-[20%]'>Last name</label>
                  <input type='text' id='lastname' {...register('lastname', { required : 'Please enter your last name'})} autoComplete="family-name" className='w-full p-2 border-2 border-solid' />
                  <small className='text-red-500 absolute bottom-[-20px] right-0'>{errors?.lastname?.message}</small>
                </div>
                <div className='flex items-center w-full relative'>
                  <label htmlFor='email' className='text-gray-500 inline-block w-[20%]'>Email</label>
                  <input type='email' id='email' {...register('email', { required : 'Please enter your email', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,  message: 'Invalid email address'} })} autoComplete="email" className='w-full p-2 border-2 border-solid' />
                  <small className='text-red-500 absolute bottom-[-20px] right-0'>{errors?.email?.message}</small>
                </div>
                <div className='flex items-center w-full relative'>
                  <label htmlFor='phone' className='text-gray-500 inline-block w-[20%]'>Phone</label>
                  <input type='number' id='phone' {...register('phone', { required : 'Please enter your phone'})} autoComplete="tel" className='w-full p-2 border-2 border-solid' />
                  <small className='text-red-500 absolute bottom-[-20px] right-0'>{errors?.phone?.message}</small>
                </div>
                <div className='flex items-center w-full justify-start'>
                  <label htmlFor='isBlocked' className='text-gray-500 inline-block w-[20%]'>Block</label>
                  <select id='isBlocked' {...register('isBlocked')} className='w-full border-2 p-2'>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                  </select>
              </div>
              <div className='flex items-center w-full'>
                <label htmlFor='role' className='text-gray-500 inline-block w-[20%]'>Role</label>
                <select id='role' {...register('role')} className='w-full p-2 border-2 border-solid'>
                  {roles?.map((role, index) => (
                    <option key={index} value={role.code}>{role.value}</option>
                  ))}
                </select>
              </div>
              </div>
              <div className='flex items-center justify-between p-4 gap-2 border-t'>
                <button type='submit' className='w-full bg-green-500 hover:bg-green-600 text-white p-2 hover:bg-main-hover rounded'>Update</button>
                <button onClick={() => handleCloseEdit()} className='w-full bg-red-500 text-white p-2 hover:bg-red-600 rounded'>Close</button>           
              </div>
            </form>
          </div>
        
        </div>
      </div>}
    </div>
  )
}

export default ManagerUsers