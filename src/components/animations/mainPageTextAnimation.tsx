"use client"
import React, { FC } from 'react'
import { motion } from 'framer-motion';
interface textprops {
  text:string,
}
export const MainPageTextAnimation: FC<textprops> = ({text}) => {
  // const text = "Only 2% of resumes make it past the first round. Be in the top 2%";
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <>
     <div className='hidden md:block'>
      <motion.div
     className='overflow-hidden flex  '
      
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className='mr-2 text-3xl font-bold'
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
    </div>
    </>
   
      
   
  )
}
 