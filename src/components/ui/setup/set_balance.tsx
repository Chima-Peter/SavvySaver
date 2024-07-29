import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsBank2 } from "react-icons/bs";
import { addCommas, removeCommas} from "../../lib/comma";


function SetBalance() {
   const navigate = useNavigate()
   const [balance, setBalance] = useState('')
   const balanceRef = useRef<HTMLInputElement>(null)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalance(event.target.value)  
   }

   const handleBlur = () => {
      if (balanceRef.current) {
         balanceRef.current.type = 'text'
         balanceRef.current.value = addCommas(balance)
      }
   }

   const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (balanceRef.current) {
         balanceRef.current.value = removeCommas(event.target.value)
         balanceRef.current.type = 'number'
      }
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (balance != '') navigate ('/success', {replace: true})
      else balanceRef.current?.focus()
   }

  return (
   <main className='w-full bg-white flex min-h-[100vh] gap-6 flex-col items-center font-main font-medium justify-center' >
         <section className="w-[100%] md:w-fit flex flex-col gap-8 border-y-4 border-x-0 md:border-4 border-gray-300 p-4 md:rounded-lg">
            <div className="flex flex-col gap-1">
               <BsBank2 className="w-5 h-5 self-center text-[#7F3DFF]" />
               <h1 className="text-lg text-center font-extrabold text-black">
                  One more step
               </h1>
               <p className="text-center px-2 text-[11px] font-semibold text-black">
                  Add your current bank balance so we can start helping you organise your finance.
               </p>
            </div>
            <form className='flex flex-col gap-14' noValidate autoComplete='off' onSubmit={handleSubmit}>
               <label htmlFor="balance" className="flex gap-2 tracking-wider text-black font-semibold items-center text-sm">
                  Balance(&#8358;):
                  <input 
                     type="number" 
                     autoFocus
                     ref={balanceRef}
                     name="balance" 
                     id="balance" 
                     autoComplete="off"
                     value={balance}
                     onFocus={handleFocus}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className='w-[80%] px-3 py-1 rounded-md autofill:bg-clip-text border-2 placeholder:text-xs text-[16px] md:text-sm placeholder:text-[#91919F] border-gray-300 shadow-lg focus:outline-none focus:border-2 focus:border-[#7F3DFF]'
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
