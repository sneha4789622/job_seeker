import { faEllipsis, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"

function MobileNav() {
  let[navicon,setNavicon]=useState(false);
  return (
    <div className="">
    <button className="fixed z-6 top-2 rounded-full right-2 bg-blue-950 text-white px-2 cursor-pointerz" onClick={()=>{
      setNavicon(!navicon)
    }}>
      {navicon ? <FontAwesomeIcon icon={faEllipsisVertical}/> :  <FontAwesomeIcon icon={faEllipsis}/>}
    </button>
    <div className={`fixed h-full top-0 w-50 pt-10 z-50 bg-blue-950 text-white px-4 duration-800 ${navicon ?  "left-0" : "-left-100" }`}>
      <ul className="w-full">
        <li className="mb-5 border-2 border-blue-950 rounded-md hover:border-white hover:border-2">Jobs</li>
        <li className="mb-5 border-2 border-blue-950 rounded-md hover:border-white hover:border-2">Top Companies</li>
        <li className="mb-5 border-2 border-blue-950 rounded-md hover:border-white hover:border-2">Profile</li>
        <li className="mb-5 border-2 border-blue-950 rounded-md hover:border-white hover:border-2">Resume</li>
        <li className="mb-5 border-2 border-blue-950 rounded-md hover:border-white hover:border-2">Help</li>
      </ul>
    </div>

    </div>
  )
}

export default MobileNav