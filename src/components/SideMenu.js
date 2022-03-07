import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'


export default function SideMenu({sideBarData}) {
    return (
        <>
            <div className='sidemenu'>
                <nav className='sideBarList'>
                    {sideBarData?.map((val,key)=>{
                        return(
                            <Link key = {key} className='row' to={val.link} >
                                {" "}
                                <div className='title'>{val.title}</div>
                            </Link>    
                        )
                    })}
                </nav>
            </div>
        </> 
    )
}
