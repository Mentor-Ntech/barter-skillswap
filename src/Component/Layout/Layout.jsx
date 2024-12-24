import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
   <>
   <Header/>
   <div><main>{children}</main></div>

   <Footer />
   </>
  
  )
}

export default Layout