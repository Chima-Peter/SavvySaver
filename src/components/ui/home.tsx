import { useEffect, useState } from "react"
import { useBaseContext } from "../../App"
import { motion } from 'framer-motion'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { Link } from "react-router-dom"

function Home() {
   const base = useBaseContext()
   const [enter, setEnter] = useState(true)

   const enterVariant = {
      initial: {
         y: 50,
         opacity: 0
      },
      final: {
         y: 0,
         opacity: 1
      }
   }
   const boxVariants = {
      initial: {
         scale: 0.5,
      },
      final: {
         scale: 1,
         transition: {
            type: 'tween',
         }
      }
   }

   useEffect(() => {
      setTimeout(() => {setEnter(false)}, 3000)
   }, [])

  return (
   <main className="font-main flex justify-center items-center min-h-[100vh] w-full">
      {
         enter ? <div className="bg-[#7F3DFF] flex w-[100%] min-h-[100vh] justify-center items-center">
            <motion.div 
               className='flex justify-center items-center relative w-[100%]'
               variants={enterVariant}
               initial='initial'
               animate='final'
               transition={{duration: 1.5, type: 'tween'}}>
               <img src={`${base}images/onboarding/ellipse.svg`}  className="w-20 absolute translate-x-[-50%] translate-y-0-[-50%]"  alt="" />
               <h1 className="text-white text-4xl lg:text-5xl translate-y-[-5px] font-extrabold">
                  SavvySaver
               </h1>
            </motion.div>
         </div> 
         : 
         <motion.section className='lg:border border-gray-300 lg:w-[800px] p-4 lg:shadow-lg lg:rounded-md md:border md:w-full md:shadow-md md:p-6 flex gap-7 flex-col items-center'  variants={boxVariants} initial='initial' animate='final'>
            <div className="flex max-w-[400px]">
               <Carousel 
                  infiniteLoop useKeyboardArrows={false} autoPlay stopOnHover={false} showIndicators={false} transitionTime={500} showThumbs={false} showArrows={false} showStatus={false} interval={3000}>
               <div className="flex flex-col justify-center items-center w-fit">
                     <img src={`${base}images/onboarding/control.webp`} className="max-w-[300px] h-[300px]" />
                     <div>
                           <h2 className="font-bold text-black text-xl">
                              Gain total control of your money
                           </h2>
                           <p className="text-xs text-[#91919F] tracking-wider py-2 text-center px-2">
                              Become your own money manager and make every cent count.
                           </p>
                     </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-fit">
                     <img src={`${base}images/onboarding/goes.webp`} className="max-w-[300px] h-[300px]" />
                     <div>
                           <h2 className="font-bold text-black text-xl">
                              Know where your money goes
                           </h2>
                           <p className="text-xs text-[#91919F] tracking-wider py-2 text-center px-2">
                              Track your transactions easily with categories and financial report
                           </p>
                     </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-fit">
                     <img src={`${base}images/onboarding/plan.webp`} className="max-w-[300px] h-[300px]" />
                     <div>
                           <h2 className="font-bold text-black text-xl">
                              Planning
                           </h2>
                           <p className="text-xs text-[#91919F] tracking-wider py-2 text-center px-2">
                              Setup your budget for each category so you're always in control of your finances
                           </p>
                     </div>
                  </div>
               </Carousel>
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-[100%] items-center justify-center">
               <Link replace to={'/signup'}  className="bg-[#7F3DFF] text-[#FCFCFC] border border-[#7F3DFF] tracking-wider rounded-xl text-sm font-bold w-[90%] md:w-[300px] py-3 px-4 text-center focus:outline-none" 
               >
                  Sign Up
               </Link>
               <Link replace to={'/login'}  className="bg-[#EEE5FF] border border-[#FCFCFC] tracking-wide rounded-xl text-sm font-bold w-[90%] md:w-[300px] text-[#7F3DFF] py-3 px-4 text-center focus:outline-none" 
               >
                  Login
               </Link>
            </div>
         </motion.section>
      }
   </main>
  )
}

export default Home
