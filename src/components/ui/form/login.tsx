import  { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Direction from '../../lib/direction'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import validator from 'validator';

function LogIn() {
   const [loginData, setLoginData] = useState({
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
   })
   const [show, setShow] = useState(true)
   const passwordRef = useRef<HTMLInputElement>(null)
   const navigate = useNavigate();

   const changeShow = () => {
      setShow(!show)
      if (passwordRef.current)
      {
         passwordRef.current.type = show ? 'text' : 'password'
      }
   }

   const emailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let email = event.target.value
      handleEmail(email)
   }


   const passwordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let password = event.target.value
      handlePassword(password)
   }

   const handleEmail = (email : string) => {
      if (!validator.isEmpty(email)) {
         if (!validator.isEmail(email))
            setLoginData({ ...loginData, ['emailError']: `Email address should be in forrmat of example@gmail.com`})
      } else 
         setLoginData({ ...loginData, ['emailError']: `What's your email address`})
   }

   const handlePassword = (password: string) => {
      if (!validator.isEmpty(password)) {
         if (!validator.isStrongPassword(password))
            setLoginData({ ...loginData, ['passwordError']: `Password should contain at least one uppercase letter, one lowercase letter, a number and one special character`})
      } else 
         setLoginData({ ...loginData, ['passwordError']: `You need a password to continue`})
   }

   const handleChange = (event: React. ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [event.target.name]: event.target.value, ['emailError']: '', ['passwordError']: ''})
   }

   const handleSubmit = () => {
      event?.preventDefault()
      if (!validator.isEmail(loginData.email))
         handleEmail(loginData.email)
      else if (!validator.isStrongPassword(loginData.password))
         handlePassword(loginData.password)
      else
         navigate('/setup1', {replace: true})
   }

  return (
    <main className='w-full flex min-h-[100vh] gap-10 flex-col items-center font-main font-medium'>
      <Direction link={'/signup'} text={'Login'} />
      <section className='lg:border border-gray-300 lg:w-[800px] p-4 lg:shadow-lg lg:rounded-md md:border md:w-full md:shadow-md md:p-6 md:py-10 flex gap-7 flex-col justify-center'>
         <form className='flex flex-col gap-4' noValidate autoComplete='on' onSubmit={handleSubmit}>     
               <label htmlFor="email" className='flex flex-col w-[100%] text-sm text-black'>
                  <input autoFocus type="email" name='email' autoComplete='on' onBlur={emailBlur} onChange={handleChange} value={loginData.email} placeholder='Email' id='email' className='text-[16px] md:text-sm autofill:bg-clip-text text-black px-4 py-2 rounded-lg border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA]'/>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600'>{loginData.emailError}</span>
               </label>
               <label htmlFor="password" className='flex flex-col relative'>
                  <div className='flex items-center relative'>
                     <input ref={passwordRef} type="password" name='password' autoComplete='on' onBlur={passwordBlur} onChange={handleChange} value={loginData.password} placeholder='Password' id='password' className='w-[100%] px-4 py-2 rounded-lg text-[16px] md:text-sm autofill:bg-clip-text border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA]'/>
                     {
                        show ? <IoEyeOutline className='translate-x-[-5%] text-[#91919F] absolute right-[5%] cursor-pointer w-4 h-4' onClick={changeShow}/> : <IoEyeOffOutline   className='translate-x-[-5%] text-[#91919F] absolute right-[5%] cursor-pointer w-4 h-4' onClick={changeShow}/>
                     }
                  </div>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600'>{loginData.passwordError}</span>
               </label>
               <div  className='flex px-2 text-[11px] text-white font-medium tracking-tight'>
                  <p className=''>
                     By signing up, you agree to the <strong className='text-white font-semibold'>Terms of Service and Privacy Policy</strong>.
                  </p>
               </div>
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold py-3 px-4  translate-y-[-15px] focus:outline-none tracking-wide" 
               >
                  Login
               </button>
               <Link className='text-sm self-center font-bold text-[#7F3DFF]' to='/forgot_password'>
                  Forgot Password?
               </Link>
               <p className='self-center text-xs text-[#91919F]'>
                  Don't have an account yet? &nbsp;
                  <Link to={'/signup'} className='font-semibold text-[#7F3DFF] text-xs underline tracking-wider'>
                     Sign up
                  </Link>
               </p>
         </form>
      </section>
    </main>
  )
}

export default LogIn