import { Button } from "@mui/material";

import React from 'react'

const Mybutton = ({text}) => {
  return (
    <button
      className="bg-gradient-to-b from-[#37AEE2] to-[#1E96C8] rounded-md text-white flex justify-center text-base font-normal px-7 py-4 border-0 cursor-pointer select-none hover:from-[#1D95C9] hover:to-[#17759C] transition-all"
    >
      {text}
    </button>
  )
}

export default Mybutton
