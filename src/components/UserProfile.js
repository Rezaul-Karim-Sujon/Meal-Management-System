import React from 'react'
import {useSelector} from "react-redux"

export default function UserProfile() {
  const user=useSelector(state=>state.user)
  const userData = useSelector(state=>state.user.user)
  return (
      <div>
          <div className='row userProfile'>
              <div className='col-sm-8'>{userData.name} </div> 
              <div className='col-sm-4'>
                {user.isAuthenticate &&
                <button className='btn btn-sm btn-danger'>Logout</button>
              }
                
                </div>
           </div>
      </div>
  )
}
