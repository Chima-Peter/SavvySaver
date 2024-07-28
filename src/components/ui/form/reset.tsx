import  { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Direction from '../../lib/direction'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import validator from 'validator';

function ResetPassword() {
   const [loginData, setLoginData] = useState({
      confirmPassword: '',
      confirmPasswordError: '',
      password: '',
      passwordError: '',
   })
   const [show, setShow] = useState(true)
   const [showConfirm, setShowConfirm] = useState(true)
   const passwordRef = useRef<HTMLInputElement>(null)
   const confirmPasswordRef = useRef<HTMLInputElement>(null)
   const navigate = useNavigate();

   const changeShow = () => {
      setShow(!show)
      if (passwordRef.current)
      {
         passwordRef.current.type = show ? 'text' : 'password'
      }
   }

   const changeShowConfirm = () => {
      setShowConfirm(!showConfirm)
      if (confirmPasswordRef.current)
      {
         confirmPasswordRef.current.type = showConfirm ? 'text' : 'password'
      }
   }


   const passwordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let password = event.target.value
      handlePassword(password)
   }

   const confirmPasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let password = event.target.value
      handleConfirmPassword(password)
   }

   const handlePassword = (password: string) => {
      if (!validator.isEmpty(password)) {
         if (!validator.isStrongPassword(password))
            setLoginData({ ...loginData, ['passwordError']: `Password should contain at least one uppercase letter, one lowercase letter, a number and one special character`})
      } else 
         setLoginData({ ...loginData, ['passwordError']: `You need a password to continue`})
   }

   const handleConfirmPassword = (password: string) => {
      if (!validator.isEmpty(password)) {
         if (loginData.password !== password)
            setLoginData({ ...loginData, ['confirmPasswordError']: `Passwords don't match`})
         else if (!validator.isStrongPassword(password))
            setLoginData({ ...loginData, ['confirmPasswordError']: `Password should contain at least one uppercase letter, one lowercase letter, a number and one special character`, ['passwordError']: `Password should contain at least one uppercase letter, one lowercase letter, a number and one special character`})
      } else 
         setLoginData({ ...loginData, ['confirmPasswordError']: `You need a password to continue`})
   }

   const handleChange = (event: React. ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [event.target.name]: event.target.value, ['passwordError']: '', ['confirmPasswordError']: ''})
   }

   const handleSubmit = () => {
      event?.preventDefault()
      if (loginData.password != loginData.confirmPassword)
         handleConfirmPassword(loginData.confirmPassword)
      if (!validator.isStrongPassword(loginData.confirmPassword))
         handlePassword(loginData.confirmPassword)
      else if (!validator.isStrongPassword(loginData.password))
         handlePassword(loginData.password)
      else
         navigate('/login', {replace: true})
   }

  return (
    <main className='w-full flex min-h-[100vh] gap-10 flex-col items-center font-main font-medium dark:bg-black' >
      <Direction link={'/forgot_password'} text={'Reset Password'} />
      <section className='lg:border border-gray-300 dark:border-0 lg:w-[800px] p-4 lg:shadow-lg lg:rounded-md md:border md:w-full md:shadow-md md:p-6 md:py-10 flex gap-7 flex-col justify-center'>
         <form className='flex flex-col gap-4' noValidate autoComplete='on' onSubmit={handleSubmit}>     
               <label htmlFor="password" className='flex flex-col relative'>
                  <div className='flex items-center relative'>
                     <input ref={passwordRef} type="password" name='password' autoComplete='on' onBlur={passwordBlur} onChange={handleChange} value={loginData.password} placeholder='Password' id='password' className='w-[100%] px-4 py-2 rounded-lg text-[16px] md:text-sm autofill:bg-clip-text border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA] dark:autofill:fill-none dark:autofill:bg-clip-padding'/>
                     {
                        show ? <IoEyeOutline className='translate-x-[-5%] text-[#91919F] absolute right-[5%] cursor-pointer w-4 h-4 dark:text-black' onClick={changeShow}/> : <IoEyeOffOutline   className='translate-x-[-5%] text-[#91919F] absolute dark:text-black right-[5%] cursor-pointer w-4 h-4' onClick={changeShow}/>
                     }
                  </div>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600 dark:text-white'>{loginData.passwordError}</span>
               </label>
               <label htmlFor="password" className='flex flex-col relative'>
                  <div className='flex items-center relative'>
                     <input ref={confirmPasswordRef} type="password" name='confirmPassword' autoComplete='on' onBlur={confirmPasswordBlur} onChange={handleChange} value={loginData.confirmPassword} placeholder='Confirm Password' id='confirmPassword' className='w-[100%] px-4 py-2 rounded-lg text-[16px] md:text-sm autofill:bg-clip-text border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA] dark:autofill:fill-none dark:autofill:bg-clip-padding'/>
                     {
                        showConfirm ? <IoEyeOutline className='translate-x-[-5%] text-[#91919F] absolute right-[5%] cursor-pointer w-4 h-4 dark:text-black' onClick={changeShowConfirm}/> : <IoEyeOffOutline   className='translate-x-[-5%] text-[#91919F] absolute dark:text-black right-[5%] cursor-pointer w-4 h-4' onClick={changeShowConfirm}/>
                     }
                  </div>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600 dark:text-white'>{loginData.confirmPasswordError}</span>
               </label>
               <div  className='flex px-2 text-[11px] text-white font-medium tracking-tight dark:text-black'>
                  <p className=''>
                     By signing up, you agree to the <strong className='text-white font-semibold dark:text-black'>Terms of Service and Privacy Policy</strong>.
                  </p>
               </div>
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold py-3 px-4  translate-y-[-15px] focus:outline-none tracking-wide  dark:font-medium" 
               >
                  Reset Password
               </button>
         </form>
      </section>
    </main>
  )
}

export default ResetPassword