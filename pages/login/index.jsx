import Image from 'next/image'
import React from 'react'
import style from '../../styles/reg.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Index = () => {


  const router = useRouter()

  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [err, setErr] = useState(false);


  const submitLogin = async (e) => {
    e.preventDefault();
    await axios.post(`https://cms-qdb.onrender.com/login`, {
      email: email,
      pwd: pwd
    }).then((response) => {
      var auth = response.data;
      if(auth !== "0"){
        var id = auth[0].author_id
        localStorage.setItem('authId', id)
      }
      else{
        setErr(true);
      }
    }).then(() => {
      router.push(`/dashboard`);
    }).catch((error) => {
      setErr(true);
      console.log(error)
    })
  }

  return (
    <div className={style.all}>
      <div className={style.imgdiv}>
        <Image src={'/the quiver logo.png'} fill={true} alt='' />
      </div>
      <div className={style.formDiv}>
        <h1>Login</h1>
        {err ? <p style={{ color: "#f00" }}>Login Faild!, Try Again.</p> : <></>}
        <form className={style.form} onSubmit={submitLogin}>
            <div className={style.fdiv}>
              <label>Email Address <span style={{ color: "#f00" }}>&#42;</span></label>
              <input className={style.input} type="email" required onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={style.fdiv}>
              <label>Password <span style={{ color: "#f00" }}>&#42;</span></label>
              <input className={style.input} type="password" required onChange={e => setPwd(e.target.value)} />
            </div>
          <button type='submit' className={style.button}>Login</button>
        </form>
        <p>Not Have An Account <Link href={`/register`}><u style={{ color: "#f00" }}>Sign Up Here</u></Link></p>
      </div>
    </div>
  )
}

export default Index
