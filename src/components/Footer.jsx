import React from 'react'

function Footer() {
  return (
    <div>
          <footer className="mt-8 h-24 border-t border-cyan-400/20 w-full flex justify-center items-center">
              <span className="text-cyan-500">© </span>{" "}
              <span className="text-white text-sm">
                  &nbsp;2024 Weather-App. All Rights Reserved.
              </span>
          </footer>
    </div>
  )
}

export default Footer