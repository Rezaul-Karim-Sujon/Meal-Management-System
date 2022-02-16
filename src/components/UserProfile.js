import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {userLogoutAction} from "../redux/user/userLogoutAction "

export default function UserProfile() {
  const user=useSelector(state=>state.user)
  const userData = useSelector(state=>state.user.user)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(userLogoutAction())
  }
  return (
      <div>
          <div className='row userProfile'>
              <div className='col-sm-8'>{userData.name} </div> 
              <div className='col-sm-4'>
                {user.isAuthenticate &&
                <button className='btn btn-sm btn-danger'
                onClick={handleLogout}
                >Logout</button>
              }
                
                </div>
           </div>
      </div>
  )
}
