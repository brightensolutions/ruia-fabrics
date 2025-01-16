import Aboutus from '@/components/About-us'
import { InfiniteMovingCardsDemo } from '@/components/Home'
import OurIndustry from '@/components/Our-Industry'
import OurServices from '@/components/Our-Services'
import Quality from '@/components/Quality'
import React from 'react'

const page = () => {
  return (
    <>
      <InfiniteMovingCardsDemo/>
      <Aboutus/>
      <OurIndustry/>
      <OurServices/>
      <Quality/>
    </>
  )
}

export default page
