import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';
import {useSelector} from "../components/AuthContext";
// icons from font awsome

export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <Header className="bg-slate-200 shadow-md">
      {/* change colour and within line */}
      <div className="flex justify-between items-center max-w-6xl mix-auto p-3">
        {/* header paer */}
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
         </Link>
        {/* search design */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none  w-24 sm:w-64 md:w-90"
          ></input>
          <FaSearch className="text-slate-600" />
        </form>
        {/* home and about */}
        <ul className="flex gap-4">
            <Link to='/'>
            <li className="hidden sm:inline  text-slate-700 hover:underline">Home</li>
            </Link>
            <Link to='/'>
            <li className= "hidden sm:inline  text-slate-700 hover:underline">About</li>
            </Link>

            {/* sign in display in home page */}
            <Link to='/profile'>
            {currentUser ?  (
<img className="rounded-full h-7 w-7  object-cover" src={currentUser.avatar} alt="profile"/>
            ):(<li className= " text-slate-700 hover:underline">SignIN</li>
         
           
            
          ) }
           </Link>
       
        </ul>
      </div>
    </Header>
  );
}
