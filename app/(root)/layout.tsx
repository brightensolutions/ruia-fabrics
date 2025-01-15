import { NavbarMenu } from '@/components/Navbar'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <>
     <NavbarMenu/>
      {children}
    </>
  )
}

export default layout
