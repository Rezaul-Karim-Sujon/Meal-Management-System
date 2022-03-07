import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='container'>
    <div>PageNotFound</div>
    <Link  className='row' to="/">Go To Home</Link>
    </div>
  )
}
