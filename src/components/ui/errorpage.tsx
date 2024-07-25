import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='flex items-center justify-center bg-white w-full h-screen lg:h-auto md:h-auto'>
      <Link to={'/'}>
         <img 
            src="/images/desktop/404-error.webp" 
            srcSet="/images/mobile/404-error.webp 300w, /images/tablet/404-error.webp 600w, /images/desktop/404-error.webp 1200w" 
            sizes='(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px' 
            alt="ERROR PAGE" 
            rel='preload' />
      </Link>
    </div>
  )
}

export default ErrorPage