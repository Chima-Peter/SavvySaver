import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"
import { CiBarcode } from "react-icons/ci"

interface MyObject {
  [key: string]: string;
}


function SetUpPin02() {
   const navigate = useNavigate()
   const [codeValues, setCodeVal] = useState<MyObject>({
      val1: '',
      val2: '',
      val3: '',
      val4: '',
   })
   const [code, setCode] = useState({})
   const codesRef =  useRef<(HTMLInputElement | null)[]>([]);
   useEffect(() => {
      let temp = localStorage.getItem('code')
      if (temp) {
         setCode(JSON.parse(temp))
      }
   }, [])

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value == '') {
         event.target.value = ''
         setCodeVal({ ...codeValues, [event.target.name]: event.target.value})
      } else if ((event.target.value).length > 1)
         codesRef.current[Number(event.target.id)]?.focus()
       else {
            setCodeVal({ ...codeValues, [event.target.name]: event.target.value})
            codesRef.current[Number(event.target.id)]?.focus()
         }
   }
   const handleDel = (num: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (codesRef.current[num]?.value != '') {
         if (event.key === 'Delete' || event.key === 'Del') {
            codesRef.current[num]?.focus()
         } else if (event.key === 'Backspace') {
            codesRef.current[num]?.focus()
         }
      }
   }

   const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      let temp = event.clipboardData.getData('text')
      setCodeVal({ ...codeValues, ['val1']: temp[0], ['val2']: temp[1], ['val3']: temp[2], ['val4']: temp[3] })
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      let tester = true
      let index = 0
      for (const value of Object.values(codeValues)) {
         if (validator.isEmpty(value)) {
            codesRef.current[index]?.focus()
            tester = false
            break
         }
         index++
      }
      if (tester) {
         let setup2 = `${codeValues.val1}${codeValues.val2}${codeValues.val3}${codeValues.val4}`
         if (setup2 === code) navigate('/balance')
      }
   }

  return (
   <main className='w-full flex min-h-[100vh] gap-6 flex-col items-center font-main font-medium justify-center' >
         <section className="w-[100%] md:w-fit flex flex-col gap-6 border-y-4 border-x-0 md:border-4 border-gray-200 px-10 py-8 md:rounded-lg">
            <div className="flex flex-col gap-1">
               <CiBarcode className="w-6 h-6 self-center text-[#7F3DFF]" />
               <h1 className="text-md text-center font-bold">
                  Great! Let's confirm that.
               </h1>
               <p className="text-center px-2 text-[11px] font-medium">
                  Enter the same 4-diit code you just entered for confirmation please.
               </p>
            </div>
            <form className='flex flex-col gap-14' noValidate autoComplete='off' onSubmit={handleSubmit}>     
                  <div  className='flex flex-col'>
                     <div className="flex gap-2 items-center justify-center">
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] shadow-gray-300 font-extrabold border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md' autoFocus value={codeValues.val1} onPaste={handlePaste} maxLength={1} autoComplete='off' ref={el => (codesRef.current[0] = el)} onChange={handleChange} id="1" onKeyUp={handleDel(0)} onWheel={() => event?.preventDefault()} type="number" name='val1' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] shadow-gray-300 font-extrabold border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val2} onPaste={handlePaste} maxLength={1} onKeyUp={handleDel(0)} autoComplete='off' ref={el => (codesRef.current[1] = el)} onChange={handleChange} id="2" onWheel={() => event?.preventDefault()} type="number" name='val2' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] shadow-gray-300 font-extrabold border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val3} onPaste={handlePaste} maxLength={1} onKeyUp={handleDel(1)} autoComplete='off' ref={el => (codesRef.current[2] = el)} onChange={handleChange} id="3" onWheel={() => event?.preventDefault()} type="number" name='val3' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] shadow-gray-300 font-extrabold border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val4} onPaste={handlePaste} maxLength={1} onKeyUp={handleDel(2)} autoComplete='off' ref={el => (codesRef.current[3] = el)} onChange={handleChange} id="3" onWheel={() => event?.preventDefault()} type="number" name='val4' />
                     </div>
                  </div>
                  <button onWheel={() => event?.preventDefault()} type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold py-2 px-4 focus:outline-none" 
                  >
                     Continue
                  </button>
            </form>
         </section>
   </main>
  )
}

export default SetUpPin02
