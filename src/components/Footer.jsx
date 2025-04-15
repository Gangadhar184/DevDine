import React from 'react'
import {GITHUB_LINK} from '../constants/constants'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="footer ">
        Created By
        <span>❤️</span>
        <a className="linkedin-name" href={GITHUB_LINK} target="_blank">
          Gangadhar
        </a>
        <span>&copy;</span>
        {year}
        <strong>
          Tasty <span>Trails</span>
        </strong>
      </div>
    );
}

export default Footer
