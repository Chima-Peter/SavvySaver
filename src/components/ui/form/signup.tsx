import  { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Direction from '../../lib/direction'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import validator from 'validator'

function SignUp() {
   const [signUpData, setSignUpData] = useState({
      name: '',
      nameError: ' ',
      email: '',
      emailError: ' ',
      password: '',
      passwordError: ' ',
      checkbox: false
   })
   const fullNameRegex = /^[a-zA-Z '-]+$/;
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

   const nameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let name = event.target.value
      handleName(name)
   }

   const emailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let email = event.target.value
      handleEmail(email)
   }


   const passwordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let password = event.target.value
      handlePassword(password)
   }

   const handleName = (name: string) => {
      if (!validator.isEmpty(name)) {
         if (!name.match(fullNameRegex))
            setSignUpData({ ...signUpData, ['nameError']: `Name shouldn't contain numbers or special characters.`})
         if (name.length < 3)
            setSignUpData({ ...signUpData, ['nameError']: `Name should be at least 3 characters`})
      } else 
         setSignUpData({ ...signUpData, ['nameError']: `What's your name?`})
   }

   const handleEmail = (email : string) => {
      if (!validator.isEmpty(email)) {
         if (!validator.isEmail(email))
            setSignUpData({ ...signUpData, ['emailError']: `Email address should be in forrmat of example@gmail.com`})
      } else 
         setSignUpData({ ...signUpData, ['emailError']: `What's your email address`})
   }

   const handlePassword = (password: string) => {
      if (!validator.isEmpty(password)) {
         if (!validator.isStrongPassword(password))
            setSignUpData({ ...signUpData, ['passwordError']: `Password should contain at least one uppercase letter, one lowercase letter, a number and one special character`})
      } else 
         setSignUpData({ ...signUpData, ['passwordError']: `You need a password to continue`})
   }

   const handleChange = (event: React. ChangeEvent<HTMLInputElement>) => {
      setSignUpData({ ...signUpData, [event.target.name]: event.target.value, ['emailError']: '', ['passwordError']: '', ['nameError']: ''})
      if (event.target.name == 'checkbox')
         setSignUpData({ ...signUpData, [event.target.name]: !signUpData.checkbox, ['emailError']: '', ['passwordError']: '', ['nameError']: ''})
   }

   const handleSubmit = () => {
      event?.preventDefault()
      if (!validator.isAlpha(signUpData.name))
         handleName(signUpData.name)
      else if (!validator.isEmail(signUpData.email))
         handleEmail(signUpData.email)
      else if (!validator.isStrongPassword(signUpData.password))
         handlePassword(signUpData.password)
      else
         navigate('')
   }

  return (
    <main className='w-full flex min-h-[100vh] gap-10 flex-col items-center font-main font-medium dark:bg-black ' >
      <Direction link={'/login'} text={'Sign up'} />
      <section className='lg:border border-gray-300 lg:w-[800px] p-4 lg:shadow-lg lg:rounded-md md:border md:w-full md:shadow-md md:p-6 dark:border-0 md:py-10 flex gap-7 flex-col justify-center'>
         <form className='flex flex-col gap-4' noValidate autoComplete='on' onSubmit={handleSubmit}>
               <label htmlFor="name" className='flex flex-col w-[100%]'>
                  <input autoFocus type="text" name='name' autoComplete='on' onBlur={nameBlur} onChange={handleChange} value={signUpData.name} placeholder='Name' id='name' className='w-[100%] text-[16px] md:text-sm autofill:bg-clip-text text-black px-4 py-2 rounded-lg border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA] dark:autofill:fill-none dark:autofill:bg-clip-padding'/>
                  <span className='text-[10px] max-w-[380px] px-1 font-medium pt-1 text-red-600 dark:text-white'>{signUpData.nameError}</span>
               </label>
               <label htmlFor="email" className='flex flex-col w-[100%] text-sm text-black'>
                  <input type="email" name='email' autoComplete='on' onBlur={emailBlur} onChange={handleChange} value={signUpData.email} placeholder='Email' id='email' className='w-[100%] text-[16px] md:text-sm autofill:bg-clip-text text-black px-4 py-2 rounded-lg border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA] dark:autofill:fill-none dark:autofill:bg-clip-padding'/>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600 dark:text-white'>{signUpData.emailError}</span>
               </label>
               <label htmlFor="password" className='flex flex-col w-[100%]'>
                 <div className='flex items-center relative'>
                      <input ref={passwordRef} type="password" name='password' autoComplete='on' onBlur={passwordBlur} onChange={handleChange} value={signUpData.password} placeholder='Password' id='password' className='w-[100%] px-4 py-2 rounded-lg autofill:bg-clip-text border placeholder:text-xs text-[16px] md:text-sm placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA] dark:autofill:fill-none dark:autofill:bg-clip-padding'/>
                     {
                        show ? <IoEyeOutline className='translate-x-[-5%] text-[#91919F] absolute right-[5%] cursor-pointer w-6 h-6 lg:w-4 lg:h-4 dark:text-black' onClick={changeShow}/> : <IoEyeOffOutline   className='translate-x-[-5%] text-[#91919F] absolute dark:text-black right-[5%] cursor-pointer w-6 h-6 lg:w-4 lg:h-4' onClick={changeShow}/>
                     }
                 </div>
                  <span className='text-[10px] max-w-[380px] px-1 pt-1 font-medium text-red-600 dark:text-white'>{signUpData.passwordError}</span>
               </label>
               <div  className='flex px-2 text-[11px] gap-1 items-start md:items-center font-medium tracking-tight'>
                  <input type="checkbox" name="checkbox" onChange={handleChange} id="check" className='border-4 cursor-pointer accent-[#7F3DFF] border-[#7F3DFF] outline-none rounded-lg w-6 h-6 lg:w-4 lg:h-4 translate-x-[-5%]' />
                  <p className='dark:text-white dark:font-normal'>
                     By signing up, you agree to the <Link to='' className='dark:font-semibold text-[#7F3DFF] font-semibold translate-x-[-2px]'>Terms of Service and Privacy Policy</Link>.
                  </p>
               </div>
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold py-3 px-4 mt-4  focus:outline-none  tracking-wider dark:font-medium" 
               >
                  Sign Up
               </button>
               <p className='mt-2 text-xs text-[#91919F]'>
                  Already have an account? <Link to={'/login'} className='font-semibold text-[#7F3DFF] underline 
                   tracking-wider dark:font-medium'>Login</Link>
               </p>
         </form>
         <div >
         </div>
      </section>
    </main>
  )
}

export default SignUp