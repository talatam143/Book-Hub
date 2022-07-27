import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerContainerSocialMedia">
        <FaGoogle className="footerIcons" />
        <FaTwitter className="footerIcons" />
        <FaInstagram className="footerIcons" />
        <FaYoutube className="footerIcons" />
      </div>
      <p className="footerParagraph">Contact Us</p>
    </div>
  )
}

export default Footer
