import Image from 'next/image'
import React from 'react'
import style from '../styles/reg.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = () => {


  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('authId')
    if(id){
      router.push(`/dashboard`)
    }
    else{
      router.push(`/login`)
    }
  }, []);

  return (
    <div>
      <div>
        <Image src={'/the quiver logo.png'} fill={true} alt='' />
      </div>
    </div>
  )
}

export default index
