import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import  {navLinks} from '../constants/navigation'
import { useDispatch } from 'react-redux';
import  {logout} from '../store/authSlice'

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch()

  const handelLogout = ()=> {
    try{
      dispatch(logout())
    }catch (err){
      console.log(err)
    }
  }

  return (
    <aside className="h-full w-56 bg-white border-r border-slate-200 flex flex-col transition-all duration-300">
      <nav className="flex-1 min-h-0 flex flex-col gap-1 mt-0 overflow-y-auto py-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href || 
                          (link.href === '/practice' && (location.pathname.startsWith('/practice/') || location.pathname.startsWith('/theory/') || location.pathname.startsWith('/code/')))
                         || (link.href === '/mock-interviews' && location.pathname === '/interview-room');
          return (
            <a
              key={link.name}
              href={link.href}
              className={
                `group flex items-center gap-4 px-4 py-3 border-l-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary-light relative ` +
                (isActive
                  ? 'bg-gradient-to-r from-primary-dark to-primary-light border-primary text-white shadow-lg scale-[1.03] ring-2 ring-primary/30 z-10'
                  : 'hover:bg-primary-light/10 border-transparent hover:border-primary-light text-primary')
              }
              tabIndex={0}
            >
              <link.icon className={`h-6 w-6 transition ${isActive ? 'text-white' : 'text-primary-light group-hover:text-primary-dark'}`} />
              <div className="flex flex-col items-start">
                <span className={`text-sm group-hover:text-primary-dark transition ${isActive ? 'text-white font-bold' : 'text-primary'}`}>{link.name}</span>
                <span className={`text-xs group-hover:text-primary-light transition ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{link.info}</span>
              </div>
            </a>
          );
        })}
      </nav>
      {/* Account and Logout section styled like navigation, always visible at bottom */}
      <div className="flex flex-col items-center w-full px-2 pb-2 pt-2 border-t border-gray-100">
        <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-primary-light/10 transition-all border-l-4 border-transparent hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light relative">
          <UserCircleIcon className="h-6 w-6 text-primary-light group-hover:text-primary-dark transition" />
          <div className="flex flex-col items-start">
            <span className="text-primary font-bold text-sm group-hover:text-primary-dark transition">Account</span>
            <span className="text-xs text-gray-400 group-hover:text-primary-light transition">Manage your account</span>
          </div>
        </button>
        <button 
          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-primary-light/10 transition-all border-l-4 border-transparent hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light text-primary font-bold text-sm rounded-none" 
          onClick={handelLogout}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-primary-light group-hover:text-primary-dark transition" />
          <span>Logout</span>
        </button>
        {/* <div className="w-full flex flex-col items-center mt-2">
          <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} LevelUpHire</span>
          <span className="mt-1 inline-block bg-primary-light/10 text-primary font-semibold text-[10px] px-2 py-0.5 rounded uppercase tracking-wide">{APP_VERSION}</span>
        </div> */}
      </div>
    </aside>
  );
} 