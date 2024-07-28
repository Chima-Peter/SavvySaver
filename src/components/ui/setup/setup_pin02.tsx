import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"


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
         console.log(num)
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
         if (setup2 === code) navigate('/setup2')
      }
   }

  return (
   <main className='w-full flex min-h-[100vh] gap-14 flex-col items-center font-main font-medium dark:bg-black justify-center' >
         <h1 className="text-md text-center dark:font-medium font-bold dark:text-white">
            OK. Re type your pin again.
         </h1>
         <form className='flex flex-col gap-14' noValidate autoComplete='off' onSubmit={handleSubmit}>     
               <div  className='flex flex-col'>
                  <div className="flex gap-2 items-center justify-center">
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md' autoFocus value={codeValues.val1} maxLength={1} autoComplete='off' ref={el => (codesRef.current[0] = el)} onPaste={handlePaste} onChange={handleChange} id="1" onKeyUp={handleDel(3)} onWheel={() => event?.preventDefault()} type="number" name='val1' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val2} maxLength={1} onPaste={handlePaste} onKeyUp={handleDel(0)} autoComplete='off' ref={el => (codesRef.current[1] = el)} onChange={handleChange} id="2" onWheel={() => event?.preventDefault()} type="number" name='val2' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val3} maxLength={1} onPaste={handlePaste} onKeyUp={handleDel(1)} autoComplete='off' ref={el => (codesRef.current[2] = el)} onChange={handleChange} id="3" onWheel={() => event?.preventDefault()} type="number" name='val3' />
                        <input className='border text-center py-1 w-8 text-[#7F3DFF] font-extrabold dark:border-0 border-gray-300 rounded-md focus:shadow-lg focus:border focus:outline-none shadow-md'  value={codeValues.val4} maxLength={1} onPaste={handlePaste} onKeyUp={handleDel(2)} autoComplete='off' ref={el => (codesRef.current[3] = el)} onChange={handleChange} id="3" onWheel={() => event?.preventDefault()} type="number" name='val4' />
                  </div>
               </div>
               <button type="submit" className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] rounded-xl text-sm font-bold dark:font-medium py-2 px-4 focus:outline-none w-[200px] translate-y-[100%]" 
               >
                  Continue
               </button>
         </form>
   </main>
  )
}

export default SetUpPin02
