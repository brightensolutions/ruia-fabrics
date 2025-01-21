import Aboutus from '@/components/About-us'
import { InfiniteMovingCardsDemo } from '@/components/Home'
import OurIndustry from '@/components/Our-Industry'
import OurServices from '@/components/Our-Services'
import Quality from '@/components/Quality'
import WhyChoode from '@/components/Why-Choode'
import React from 'react'
import { MarqueeDemo } from '@/components/Our-Client'
import ContactUs from '@/components/ContactUs'
const page = () => {
  return (
    <div className='overflow-hidden    '>
      <InfiniteMovingCardsDemo/>
      <Aboutus/>
      <OurIndustry/>
      <OurServices/>
      <Quality/>
      <WhyChoode/>
      <MarqueeDemo/>
      <ContactUs/>
    </div>
  )
}

export default page
