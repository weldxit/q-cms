import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../../styles/cate.module.css'
import Header from '../../components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Index = () => {

    const router = useRouter()

    const [post, setPost] = useState(true);
    const [url, setUrl] = useState();
    const [getAllYt, setGetAllYt] = useState();
    const [getYt, setGetYt] = useState();
    const [c, setC] = useState(false);
    const [crCate, setCrCate] = useState(false);

    function penC() {
        setC(true);
        setCrCate(false)
    }

    function clickC() {
        setC(false);
        setCrCate(true)
    }

    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const postYt = async (e) => {
        e.preventDefault()
        axios.post(`https://cms-qdb.onrender.com/youtube/new_record`, {
            yt_desc: url,
        }).then((response) => {
            e.target.reset()
            axios.get(`https://cms-qdb.onrender.com/youtube_details`).then((response) => {
                setGetAllYt(response.data)
            })
        })
    }

    const getYtById = async (id) => {
        await axios.get(`https://cms-qdb.onrender.com/youtube_details/${id}`).then((response) => {
            setGetYt(response.data);
        }).then(() => {
            penC()
            handleRefresh()
        })
    }

    function codeGenerate(ylink) {
        const code = ylink.slice(32, 43)
        return code
    }

    useEffect(() => {
        axios.get(`https://cms-qdb.onrender.com/youtube_details`).then((response) => {
            setGetAllYt(response.data)
        })
    }, []);

    return (
        <Header>
            <div className={style.all}>
                <div className={style.cate}>
                    <div className={post === true ? style.cates : style.none}>
                        <button className={style.add} onClick={clickC}>+ Add YouTube</button>
                        {getAllYt && getAllYt.map((post, Index) => (
                            <div className={style.posts} key={Index} onClick={() => getYtById(post.yt_id)}>
                                <p className={style.p}>{post.yt_desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={crCate || c === true ? style.post : style.none}>
                    <div className={crCate === true ? style.block : style.none}>
                        <div>
                            <form onSubmit={postYt} className={style.form}>
                                <div className={style.fdiv}>
                                    <label>Youtube Link <span style={{ color: "red" }}>&#42;</span></label>
                                    <input className={style.input} type="text" onChange={e => setUrl(e.target.value)} />
                                </div>
                                <button className={style.button} type="submit">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={c === true ? style.block : style.none} key={refreshKey}>
                        {getYt && getYt.map((post, Index) => (
                            <div key={Index}>
                                <iframe className={style.frame} src={`https://www.youtube.com/embed/${codeGenerate(post.yt_desc)}?rel=0`} title="YouTube video player" frameborder="0" allow=" autoplay; clipboard-write; encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Header >
    )
}

export default Index
