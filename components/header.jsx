import React from 'react'
import style from '../styles/header.module.css'
import { useRouter } from 'next/router';

const Header = (props) => {

  const router = useRouter();

  function logout() {
    localStorage.removeItem("authId");
    router.push(`/login`);
  }

  return (
    <div>
      <div className={style.head}>
        <h1>The Quiver CMS</h1>
        <button className={style.btn} onClick={logout}>Logout</button>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default Header
