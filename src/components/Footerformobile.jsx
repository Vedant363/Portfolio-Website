import React from 'react'

const Footerformobile = () => {
  return (
    <div>
      <footer className="footerformobile w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-gray-300 py-4 mt-1 shadow-lg shadow-gray-700">
      <div className="container mx-auto px-4">
        <div className="w-full gap-6 flex flex-row justify-center items-center">
        <a href="https://github.com/Vedant363" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/vedant-ghumde363" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="mailto:vedant.ghumade363@gmail.com" className="hover:text-white transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail" className="w-6 h-6" />
            </a>
            <a href="https://leetcode.com/u/vedant__363/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="w-6 h-6" />
            </a>
        </div>

        <br />
        <div className="text-center text-sm text-gray-800 font-semibold">
          <p>&copy; {new Date().getFullYear()} Vedant Ghumade. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footerformobile
