import { useEffect } from "react"
import { useBaseContext } from "../../../App"

function Success() {
   const base = useBaseContext()
   useEffect(() => {
      setTimeout(() => {
         alert('on to the next')
      }, 1000)
   }, [])
   return (
      <main className='bg-white flex justify-center items-center h-[100vh] w-[100%] flex-col'>
         <img src={`${base}images/onboarding/success.webp`} />
         <h4 className="text-lg font-semibold">
            You're all set!
         </h4>
      </main>
  )
}

export default Success
