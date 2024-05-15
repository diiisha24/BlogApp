import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faGithub} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  const user ={
    instagram: 'https://www.instagram.com/deee_wrldfwb/',
    linkedin: 'https://www.linkedin.com/in/diiisha24/',
    github: "https://github.com/Diiisha24"
  }
  return (
    <div className='footer'>
    
    <div className='icons_wrapper'>
      <a href="mailto:gargdisha1420@gmail.com">
        <FontAwesomeIcon size='lg' icon={faEnvelope} />
      </a>
      <a href={user.instagram} target='_blank'  rel='noopener noreferrer'>
        <FontAwesomeIcon size='lg' icon={faInstagram} />
      </a>
      <a href={user.linkedin} target='_blank'>
        <FontAwesomeIcon size='lg' icon={faLinkedin} />
      </a>
      <a href={user.github} target='_blank'>
      <FontAwesomeIcon size='lg' icon={faGithub} />
      </a>
    </div>
    <div className='copyright_wrapper'>
      <div>© Copyright DishaG.</div>
      <div className='mail_wrapper'>
        gargdisha1420@gmail.com
      </div>
    </div>

    </div>
  )
}

export default Footer
