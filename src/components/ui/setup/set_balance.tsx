import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CiBank } from "react-icons/ci";


function SetBalance() {
   const navigate = useNavigate()
   const [balance, setBalance] = useState('')
   const balanceRef = useRef<HTMLInputElement>(null)
   

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalance(event.target.value)
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (balance != '') navigate ('/', {replace: true})
      else balanceRef.current?.focus()
   }

  return (
   <main className='w-full bg-[#7F3DFF] flex min-h-[100vh] gap-6 flex-col items-center font-main font-medium justify-center' >
         <section className="w-[100%] text-[#7F3DFF] bg-white md:w-fit flex flex-col gap-6 border-y-4 border-x-0 md:border-4 border-white px-10 py-8 md:rounded-lg">
            <div className="flex flex-col gap-2">
               <CiBank className="w-7 h-7 self-center text-[#7F3DFF]" />
               <h1 className="text-lg text-center font-extrabold">
                  One more step
               </h1>
               <p className="text-center px-2 text-[11px] font-semibold">
                  Add your current bank balance so we can start helping you organise your finance.
               </p>
            </div>
            <form className='flex flex-col gap-14' noValidate autoComplete='off' onSubmit={handleSubmit}>
               <label htmlFor="balance" className="flex gap-2 tracking-wider font-semibold items-center text-sm">
                  Balance(&#8358;):
                  <input 
                     type="number" 
                     ref={balanceRef}
                     name="balance" 
                     id="balance" 
                     autoComplete="off"
                     value={balance}
                     onChange={handleChange}
                     className='w-[100%] px-4 py-3 rounded-md autofill:bg-clip-text border placeholder:text-xs text-[16px] md:text-sm placeholder:text-[#91919F] text-[#7F3DFF] border-gray-100 border-t-gray-200 shadow-md focus:outline-none focus:border-2 focus:border-[#7F3DFF]'
                     autoFocus
                     onWheel={(event: React.WheelEvent<HTMLInputElement>) => event.preventDefault()} />
               </label>
                  <button type="submit" className="bg-[#7F3DFF] text-white border border-white rounded-xl text-sm font-bold py-2 px-4 focus:outline-none">
                     Continue
                  </button>
            </form>
         </section>
   </main>
  )
}

export default SetBalance
