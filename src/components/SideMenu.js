import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { SidebarData } from '../utils/SidebarData'


export default function SideMenu() {
    return (
        <>
            <div className='sidemenu'>
                <nav className='sideBarList'>
                    {SidebarData.map((val,key)=>{
                        return(
                            <Link key = {key} className='row' to={val.link} >
                                {" "}
                                <div className='icon'>{val.icons}</div>{" "}
                                <div className='title'>{val.title}</div>
                            </Link>    
                        )
                    })}
                </nav>
            </div>
        </> 
    )
}
