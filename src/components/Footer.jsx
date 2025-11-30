
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <div className='bg-black px-5 lg:px-28 py-6 flex items-center justify-between mt-16'>
      <div className='flex items-center gap-4'>
        <a href='https://github.com/smilin01' className='bg-white p-2 rounded-2xl border-2 border-black shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] hover:scale-105 transition'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.38.81 1.12.81 2.26v3.35c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg>
        </a>
        <a href='https://www.linkedin.com/in/johnsmilin/' className='bg-white p-2 rounded-2xl border-2 border-black shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] hover:scale-105 transition'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5Zm.02 4.5H3V21h3V8Zm4 0H9v13h3v-7.5c0-2 2.5-2.2 2.5 0V21h3v-8c0-4.5-5-4.3-6 2V8Z" /></svg>
        </a>
      </div>
      <motion.a href="#contact" className='relative inline-block px-4 py-2 font-medium group'
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-white group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-2xl'></span>
        <span className='absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-white rounded-2xl'></span>
        <span className='relative text-white group-hover:text-black'>Let&apos;s Connect</span>
      </motion.a>
    </div>
  )
}
