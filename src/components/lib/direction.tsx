import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from 'framer-motion'

import { Link } from 'react-router-dom';
interface MyProps {
   link: string,
   text: string
}

function Direction({link, text}: MyProps) {
   const boxVariants = {
      start: {
         opacity: 0
      },
      end: {
         opacity: 1,
         transition: {
            duration: 2
         }
      }
   }
  return (
   <motion.div variants={boxVariants} initial='start' animate='end' className='sticky top-0 left-0 p-5 flex w-[100%] self-start items-center gap-2 dark:text-white'>
   <Link to={link} className="p-2 rounded-md" >
      <FaArrowLeftLong  className="text-[#212325] w-6 h-6 dark:text-white"/>
   </Link>
   <h1 className='text-xl font-semibold self-center justify-self-center m-auto text-[#212325] translate-x-[-25px] dark:text-white  dark:font-medium'>
      {text}
   </h1>
</motion.div>
  )
}

export default Direction
