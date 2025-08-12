import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'

const Home = () => {
  return (
    <div className='bg-[#F9FAFB]'>
      <Navbar/>

      <section id='hero'>
        <Hero/>
      </section>

      <section id='features'>
        <Features/>
      </section>

      <section id='howitworks'>
        <HowItWorks/>
      </section>

      <section id='pricing'>
        <Pricing/>
      </section>
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default Home
