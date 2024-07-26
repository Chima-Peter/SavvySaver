import { useState } from "react"
import Direction from "../../lib/direction"
import validator from "validator"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
   const navigate = useNavigate()
   const [form, setForm] = useState({
      email: '',
      emailError: ''
   })

   const emailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let email = event.target.value
      handleEmail(email)
   }

   const handleEmail = (email : string) => {
      if (!validator.isEmpty(email)) {
         if (!validator.isEmail(email))
            setForm({ ...form, ['emailError']: `Email address should be in forrmat of example@gmail.com`})
      } else 
         setForm({ ...form, ['emailError']: `Enter email address`})
   }

   const handleChange = (event: React. ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [event.target.name]: event.target.value})
   }

   const handleSubmit = () => {
      event?.preventDefault()
      if (!validator.isEmail(form.email))
         handleEmail(form.email)
      else
         navigate('/sent_mail')
   }
  return (
   <main className='w-full flex min-h-[100vh] gap-14 flex-col items-center font-main font-medium dark:bg-black' >
      <Direction link={'/login'} text={'Forgot Password'} />
      <section className='lg:border border-gray-300 lg:w-[800px] p-4 lg:shadow-lg dark:border-0 lg:rounded-md md:border md:w-full md:shadow-md md:p-6 flex gap-7 md:py-14 flex-col items-center justify-center'>
         <div>
            <h1 className="text-sm text-center dark:font-medium font-bold dark:text-white">
               Don't worry.
            </h1>
            <h1 className="text-sm text-center dark:font-medium font-bold dark:text-white">
               Enter your email and we'll send you a link to reset your password.
            </h1>
         </div>
         <form className='flex flex-col gap-1 mt-6' noValidate autoComplete='on' onSubmit={handleSubmit}>     
               <label htmlFor="email" className='flex flex-col w-[100%] text-sm text-black'>
                  <input type="email" name='email' autoComplete='on' onBlur={emailBlur} onChange={handleChange} value={form.email} placeholder='Email' id='email' className='text-xs md:text-sm autofill:bg-clip-text dark:autofill:fill-none dark:autofill:bg-clip-padding text-black px-4 py-2 rounded-lg border placeholder:text-xs placeholder:text-[#91919F] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#F1F1FA]'/>
                  <span className='text-[10px] max-w-[380px] self-center px-1 pt-1 font-medium text-red-600 dark:text-white'>{form.emailError}</span>
               </label>
               <div  className='flex px-2 text-[11px] text-white font-medium tracking-tight dark:text-black'>
                  <input type="checkbox" name="checkbox" onChange={handleChange} id="check" className='border-4 cursor-pointer accent-white border-white outline-none rounded-lg w-0 h-0 translate-x-[-4px]' />
                  <p className=''>
                     By signing up, you agree to the <strong className='text-white font-semibold dark:text-black'>Terms of Service and Privacy Policy</strong>.
                  </p>
               </div>
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold dark:font-medium py-2 px-4 hover:bg-[#EEE5FF] hover:border-[#7F3DFF] hover:text-[#7F3DFF] focus:bg-[#EEE5FF] focus:border-[#7F3DFF] translate-y-[-15px] focus:outline-none focus:text-[#7F3DFF]" 
               >
                  Continue
               </button>
         </form>
      </section>
   </main>
  )
}

export default ForgotPassword
