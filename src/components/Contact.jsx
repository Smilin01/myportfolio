import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BiLogoGmail } from 'react-icons/bi';
import { BsGithub, BsCheckCircleFill } from 'react-icons/bs';
import { IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const ref = useRef(null);
  const form = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");

    emailjs
      .sendForm('service_393q3br', 'template_rnr5pdk', form.current, {
        publicKey: '3D04E7m3TtBzuRTI2',
      })
      .then(
        () => {
          setIsSending(false);
          setIsSuccess(true);
          setStatusMessage("Message sent successfully!");
          setStatusType("success");
          form.current.reset();
        },
        (error) => {
          setIsSending(false);
          setStatusMessage("Failed to send message. Please try again.");
          setStatusType("error");
          console.error('FAILED...', error.text);
        },
      );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='lg:my-16 lg:px-28 my-8 px-5'
      id='contact'
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className='text-2xl lg:text-4xl text-center'
      >
        Contact <span className='font-extrabold'>Me</span>
      </motion.h2>

      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-[40%]'
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-2 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <BsCheckCircleFill className="text-6xl mb-6" />
                </motion.div>
                <h3 className="text-3xl font-black uppercase mb-4">Thank You!</h3>
                <p className="text-[#71717A] font-medium mb-8 text-lg">
                  Your message has been sent successfully.<br />I'll get back to you soon!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSuccess(false)}
                  className="bg-black text-white px-8 py-3 rounded border-2 border-black font-bold transition-all"
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={form}
                onSubmit={sendEmail}
                className='w-full space-y-3 lg:space-y-5'
              >
                <input name="name" className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' type="text" placeholder='Your name' required />
                <input name="email" className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' type="email" placeholder='Email' required />
                <input name="title" className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' type="text" placeholder='Subject' required />
                <textarea name="message" className='resize-none border-2 px-5 py-3 h-32 border-black placeholder:text-[#71717A]  rounded text-sm w-full' placeholder='How can I help?*' required></textarea>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type='submit'
                    disabled={isSending}
                    className='bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-3 py-2 rounded flex items-center gap-x-3 font-medium disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {isSending ? 'Sending...' : 'Get In Touch'}
                  </motion.button>

                  <div className='flex items-center gap-x-2 lg:gap-x-5'>
                    {[
                      { Icon: BiLogoGmail, link: "mailto:johnsmilin0@gmail.com" },
                      { Icon: IoLogoLinkedin, link: "https://www.linkedin.com/in/johnsmilin/" },
                      { Icon: BsGithub, link: "https://github.com/smilin01" }
                    ].map(({ Icon, link }, index) => (
                      <motion.a
                        key={index}
                        href={link}
                        target={link.startsWith("http") ? "_blank" : "_self"}
                        rel={link.startsWith("http") ? "noopener noreferrer" : ""}
                        className="bg-white p-2 lg:p-3 rounded border-2 border-black"
                        whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
                {statusMessage && statusType === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-medium text-red-600"
                  >
                    {statusMessage}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-1/2'
        >
          <div className='font-extrabold text-2xl lg:text-5xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
            <h2>Let&apos;s <span className='text-white' style={{ WebkitTextStroke: '1px black' }}>talk</span> for</h2>
            <h2>Something special</h2>
          </div>

          <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6'>I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.</p>

          <div className='font-semibold text-sm lg:text-xl flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="mailto:johnsmilin0@gmail.com"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-1'>
                <IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              johnsmilin0@gmail.com
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="https://github.com/smilin01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-[5px]'>
                <BsGithub className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
              github.com/smilin01
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
