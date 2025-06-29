import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState : { errors } } = useForm();
  const handleRestPassword = async () => {
    const result = await apiResetPassword({password, token : resetToken});
    Swal.fire({
      title : result.success ? 'Good job!' : 'Opps...',
      text : result.success ? 'Password change successful' : 'Password change failed',
      icon : result.success ? 'success' : 'error'
    })
  }
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col items-center gap-[15px] w-1/3 justify-center'>
        <h3 className="uppercase font-semibold text-xl text-[#505050]">Change Password</h3>
        <form method='PUT' onSubmit={handleSubmit(handleRestPassword)} className='w-full flex flex-col gap-[15px]'>
          <div className='w-full'>
            <div className='flex items-start justify-between text-red-500'>
              <label htmlFor='password' className='text-sm font-medium text-[#505050]'>Passworld</label>
              <small>{errors?.password?.message}</small>
            </div>
            <input type='password' id='password' {...register('password', { required : 'This is required', minLength : { value : 6 , message : 'Password must be at least 6 characters'}})} onChange={(e) => setPassword(e.target.value)} className='w-full py-2 px-3 border bg-[#f6f6f6] rounded' placeholder='Enter new passworld'/>
          </div>
          <button type='submit' className='uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword