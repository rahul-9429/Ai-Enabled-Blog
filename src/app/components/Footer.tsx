import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className="flex flex-col   sm:flex-row items-center justify-around gap-2 sm:gap-0 bg-black py-5">
      {/* <Image src='/logo.png' width={100} height={100} alt="Logo" /> */}
      <span className="text-3xl font-bold text-white">Blog.</span>
      <p className="pt-4 text-sm text-white">
        All rights reserved. Copyright @Blog
      </p>
      <div className="flex gap-4 p-2">
  <FontAwesomeIcon icon={faInstagram} className="text-white w-6 h-6" />
  <FontAwesomeIcon icon={faTwitter} className="text-white w-6 h-6" />
  <FontAwesomeIcon icon={faFacebook} className="text-white w-6 h-6" />
</div>

    </div>
  )
}

export default Footer
