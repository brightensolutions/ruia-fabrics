import Footer from '@/components/Footer'
import { NavbarMenu } from '@/components/Navbar'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <>
     <NavbarMenu/>
      {children}
      <Footer/>
    </>
  )
}

export default layout
