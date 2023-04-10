import React, { useEffect } from 'react'
import Header from '../../components/header'
import style from '../../styles/dashboard.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'


const Index = () => {
    const router = useRouter();

    const [c1, setC1] = useState();
    const [c2, setC2] = useState();
    const [c3, setC3] = useState();
    const [c4, setC4] = useState();

    const post = async () => {
        var id = localStorage.getItem(`authId`);
        if(id === "2"){
            router.push(`/allpost-admin`);
        }
        else{
            router.push('/allpost');
        }
    }

    useEffect(() => {
        var id = localStorage.getItem(`authId`);
        axios.get(`https://cms-qdb.onrender.com/my_posts_count/${id}`).then((response) => {
            setC1(response.data)
        })
        axios.get(`https://cms-qdb.onrender.com/post_counts`).then((response) => {
            setC2(response.data)
        })
        axios.get(`https://cms-qdb.onrender.com/cat_counts`).then((response) => {
            setC3(response.data)
        })
        axios.get(`https://cms-qdb.onrender.com/yt_counts`).then((response) => {
            setC4(response.data)
        })
    }, []);

    return (
        <Header>
            <div className={style.all}>
                <div className={style.cards}>
                    <div className={style.card} onClick={() => router.push('/mypost')}>
                        <Image src={"/like.png"} width={120} height={120} alt="" />
                        <span className={style.text}>
                            <h1>{c1}</h1>
                            <p>My Posts</p>
                        </span>
                    </div>
                    <div className={style.card} onClick={post}>
                        <Image src={"/news.png"} width={120} height={120} alt="" />
                        <span className={style.text}>
                            <h1>{c2}</h1>
                            <p>All Posts</p>
                        </span>
                    </div>
                    <div className={style.card} onClick={() => router.push('/categories')}>
                        <Image src={"/categories.png"} width={120} height={120} alt="" />
                        <span className={style.text}>
                            <h1>{c3}</h1>
                            <p>Categories</p>
                        </span>
                    </div>
                    <div className={style.card} onClick={() => router.push('/youtube-links')}>
                        <Image src={"/yt.png"} width={120} height={120} alt="" />
                        <span className={style.text}>
                            <h1>{c4}</h1>
                            <p>Youtube Links</p>
                        </span>
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default Index
