import React from 'react'
import './Pokemon.css'
export default function Pokemon({name,image}) {
  return (
    <div className='pokemon'>
        <div className='pokemon-name'>{name}</div>
        <div><img className='pokemon-image' src={image} alt="" /></div>
    </div>
  )
}
