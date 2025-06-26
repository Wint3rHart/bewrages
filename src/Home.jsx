import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 12,
      mass: 0.7,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const childvariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

let variants2 = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.3, delayChildren: 0.3, staggerChildren: 0.4 },
  },
};

let childvariants3 = {
  initial: { opacity: 0, y: -5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

let childvariants2 = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

let text1 = "Find Your Perfect Stay – ";

function Home() {
  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col w-full text-gray-800 p-6"
      >
        <motion.header
          variants={childvariants}
          className="bg-transparent relative hover:bg-yellow-700/7 border-2 border-yellow-700/7 sm:mt-20 sm:w-[90%] m-auto flex flex-col items-center justify-center text-white text-center sm:h-150 py-16 rounded-lg transition-all duration-200"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '100px 0px',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='metadata'
            src="http://localhost:4800/video"
            controls
            className="absolute -z-1 brightness-50 h-full w-full"
          ></video>

          <motion.div variants={variants} initial="initial" animate="animate">
            <motion.h1
              variants={variants}
              initial="initial"
              animate="animate"
              className="sm:text-5xl flex relative text-xl font-bold mb-4"
            >
              {text1.split('').map((x) => (
                <motion.p variants={childvariants}>
                  {x === ' ' ? '\u00A0' : x}
                </motion.p>
              ))}

              <motion.strong
                variants={childvariants}
                className="text-yellow-800 block"
              >
                Book with Ease
              </motion.strong>
              <motion.p
                variants={childvariants3}
                className="sm:text-xl absolute sm:top-16 sm:left-55 text-yellow-800 font-semibold text-xl mb-6"
              >
                Discover top-rated hotels at unbeatable prices.
              </motion.p>
            </motion.h1>
          </motion.div>

          <motion.nav variants={variants} class="flex flex-col items-center mt-30 space-y-4">
            <motion.div variants={childvariants} className="mt-1 flex justify-evenly">
              <button
                className="group sm:w-64 w-40 border-1 border-yellow-800 transition-color duration-300 relative bg-transparent text-yellow-700 font-semibold py-2 px-4 border hover:border-gray-100 hover:text-white rounded-full"
                onClick={() => nav('/cards')}
              >
                <span className="w-full absolute inline-block opacity-0 group-hover:opacity-90 top-0 h-full -left-0 group-hover:bg-yellow-700/25 transition-all duration-300 group-hover:rounded-sm cursor-pointer"></span>
                Lets Go
              </button>
            </motion.div>
          </motion.nav>
        </motion.header>

        <motion.div
          variants={variants2}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.9, once: true }}
          className="flex sm:flex-row flex-col font-semibold justify-evenly mt-50"
        >
          <motion.section
            variants={childvariants2}
            class="my-12 text-white sm:text-xl text-center font-semibold space-y-4"
          >
            <h2 class="text-3xl text-yellow-800">Why Choose Us?</h2>
            <p>
              <strong className="text-gray-300">Best</strong> Price Guarantee
            </p>
            <p>
              <strong className="text-gray-300">24/7</strong> Customer Support
            </p>
            <p>
              <strong className="text-gray-300">Global</strong> Hotel Partnerships
            </p>
            <div class="border-t-4 border-2 border-yellow-700/85 m-10 mx-auto w-1/2"></div>
          </motion.section>

          <motion.section
            variants={childvariants2}
            class="my-12 sm:text-xl text-white font-semibold text-center space-y-4"
          >
            <h2 class="text-3xl text-yellow-800">Our Services</h2>
            <p>
              <strong className="text-yellow-700">Secure Payments</strong> – Instant confirmations
            </p>
            <p>
              <strong className="text-yellow-700">Exclusive Offers</strong> – Save on your dream destinations
            </p>
            <p>
              <strong className="text-yellow-700">Verified Hotels</strong> – Trusted reviews and premium stays
            </p>
            <div class="border-t-4 border-2 border-yellow-700/85 m-10 mx-auto w-1/2"></div>
          </motion.section>
        </motion.div>

        <motion.section
          variants={variants2}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.9 }}
          id="contact"
          className="my-12 bg-transparent text-gray-500 border-1 border-[rgba(70,10,144,1)] p-8 w-full mt-50 sm:w-1/2 m-auto flex flex-col items-center rounded-lg shadow"
        >
          <motion.h2
            variants={childvariants2}
            class="text-3xl font-semibold text-yellow-800 mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.div variants={childvariants2} className="sm:text-left">
            <p className="font-semibold text-gray-300">
              <strong className="text-yellow-700">Phone:</strong> +123-456-7890
            </p>
            <p className="font-semibold text-gray-300">
              <strong className="text-yellow-700">Email:</strong> support@hotelbooking.com
            </p>
            <p className="font-semibold text-gray-300">
              <strong className="text-yellow-700">Address:</strong> 123 Travel St, Dream City
            </p>
          </motion.div>
        </motion.section>

        <footer className="text-center text-sm text-gray-500 mt-12">
          <p>&copy; 2025 Hotel Booking. All rights reserved.</p>
        </footer>
      </motion.div>
    </>
  );
}

export default Home;
