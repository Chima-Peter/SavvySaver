import { useBaseContext } from "../../../App"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import MediaQuery from "react-responsive"


function SentMail() {
   const base = useBaseContext()

   const imgVariants = {
      initial: {
         x: '-100%'
      },
      final: {
         x: 0
      }
   }

   return (
      <main className='w-full flex min-h-[100vh] gap-10 flex-col items-center font-main font-medium dark:bg-black justify-between' >
         <section className='border border-gray-300 dark:border-0 lg:w-[800px] shadow-lg rounded-md lg:p-6 py-14 justify-between flex gap-7 flex-col items-center lg:justify-center'>
            <div className="flex flex-col gap-4 items-center">
               <motion.img 
                  src={`${base}images/onboarding/email.webp`} 
                  variants={imgVariants}
                  initial='initial'
                  animate='final'
                  transition={{duration: 0.5, type: 'tween'}}
                  className="max-w-[300px] h-[300px]" />
               <div>
                     <h2 className="font-bold text-black text-center dark:text-white text-xl">
                        Your email is on it's way
                     </h2>
                     <p className="text-xs text-[#91919F] tracking-wider py-2 text-center dark:text-white px-2">
                        We've sent a code for you to use in resetting your password.
                     </p>
               </div>
            </div>
            <MediaQuery minWidth={768}>
               <Link replace to={'/code'}  className="bg-[#7F3DFF] text-[#FCFCFC] border mb-5 border-[#7F3DFF] tracking-wider rounded-xl text-sm font-bold w-[90%] md:w-[300px] py-3 px-4 hover:bg-[#EEE5FF] hover:border-[#7F3DFF] text-center hover:text-[#7F3DFF] focus:bg-[#EEE5FF] focus:border-[#7F3DFF] focus:outline-none focus:text-[#7F3DFF]" >
                  Continue
               </Link>
            </MediaQuery>
         </section>
         <MediaQuery maxWidth={768}>
            <Link replace to={'/code'}  className="bg-[#7F3DFF] text-[#FCFCFC] border mb-5 border-[#7F3DFF] tracking-wider rounded-xl text-sm font-bold w-[90%] md:w-[300px] py-3 px-4 hover:bg-[#EEE5FF] hover:border-[#7F3DFF] text-center hover:text-[#7F3DFF] focus:bg-[#EEE5FF] focus:border-[#7F3DFF] focus:outline-none focus:text-[#7F3DFF]" >
               Continue
            </Link>
         </MediaQuery>
      </main>
  )
}

export default SentMail
