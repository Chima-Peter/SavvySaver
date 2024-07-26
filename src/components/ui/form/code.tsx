import { useState, useRef, useEffect } from "react"
import Direction from "../../lib/direction"
import { useNavigate, Link } from "react-router-dom"


function Code() {
   const navigate = useNavigate()
   const [codeValues, setCodeVal] = useState({
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      valError: ''
   })
    const numberRegex = /^\d+$/;
   const codesRef =  useRef<(HTMLInputElement | null)[]>([]);
   const [timer, setTimer] =useState(60)
   
   useEffect(() => {
      if (timer > 0) {
         setTimeout(() => {
            setTimer(timer - 1)
         }, 1000);
      }
      else {
         setTimer(0)
      }
   })

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const updateData = codeValues;
      if (event.target.value == '')
         event.target.value = ''
      else if (!event.target.value.match(numberRegex))
         {
            event.target.value = ''
         }
      else
         {
            setCodeVal({ ...codeValues, [event.target.name]: event.target.value})
            codesRef.current[Number(event.target.id)]?.focus()
         }
      setCodeVal(updateData)
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log(codeValues)
      navigate('')
   }



  return (
   <main className='w-full flex min-h-[100vh] gap-14 flex-col items-center font-main font-medium dark:bg-black' >
      <Direction link={'/forgot_password'} text={'Verification'} />
      <section className='lg:border border-gray-300 lg:w-[800px] p-4 lg:shadow-lg dark:border-0 lg:rounded-md md:border md:w-full md:shadow-md md:p-6 flex gap-6 md:py-14 flex-col items-center justify-center'>
         <h1 className="text-2xl text-center dark:font-medium font-bold dark:text-white">
            Enter your verification code
         </h1>
         <form className='flex flex-col gap-4' noValidate autoComplete='on' onSubmit={handleSubmit}>     
               <div  className='flex flex-col'>
                  <div className="flex gap-2 items-center justify-center">
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md' autoFocus maxLength={1} ref={el => (codesRef.current[0] = el)} onChange={handleChange} id="1" type="text" name='val1' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  maxLength={1} ref={el => (codesRef.current[1] = el)} onChange={handleChange} id="2" type="text" name='val2' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  maxLength={1} ref={el => (codesRef.current[2] = el)} onChange={handleChange} id="3" type="text" name='val3' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  maxLength={1} ref={el => (codesRef.current[3] = el)} onChange={handleChange} id="4" type="text" name='val4' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  maxLength={1} ref={el => (codesRef.current[4] = el)} onChange={handleChange} id="5" type="text" name='val5' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  maxLength={1} ref={el => (codesRef.current[5] = el)} onChange={handleChange} id="0" type="text" name='val6' />
                  </div>
                  <span className='text-[10px] max-w-[380px] self-center px-1 pt-1 font-medium text-red-600 dark:text-white'>{codeValues.valError}</span>
               </div>
               <p  className='px-2 text-xs text-justify text-black tracking-wide dark:text-white md:w-[45ch]'>
                  We just sent a verification code to your gmail. Check your inbox and enter code to reset password.
               </p>
               {
                  timer > 0 ? <p className="text-[9px] text-center tracking-widest text-[#7F3DFF] dark:text-[#EEE5FF] underline">
                     I didn't receive the code. Send again in 00:{timer} secs
                  </p>
                  :
                  <Link className="text-[10px] text-center font-medium tracking-wider text-[#7F3DFF] underline" to={'/forgot_password'}>
                     Resend now
                  </Link>
               }
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold dark:font-medium py-2 px-4 hover:bg-[#EEE5FF] hover:border-[#7F3DFF] hover:text-[#7F3DFF] focus:bg-[#EEE5FF] focus:border-[#7F3DFF] focus:outline-none focus:text-[#7F3DFF]" 
               >
                  Verify
               </button>
         </form>
      </section>
   </main>
  )
}

export default Code
