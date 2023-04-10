import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../../styles/cate.module.css'
import Header from '../../components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const index = () => {

    const router = useRouter()

    const [cname, setCname] = useState();
    const [cdesc, setCdesc] = useState();
    const [getallcate, setGetallcate] = useState();
    const [getcate, setGetcate] = useState();
    const [post, setPost] = useState(true);
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

    const postCategory = async (e) => {
        e.preventDefault()
        axios.post(`https://cms-qdb.onrender.com/categories/new_category`, {
            cat_name: cname,
            cat_desc: cdesc,
        }).then((response) => {
            if (response.status == 207) {
                alert("Aleady Exist")
            }
            else {
                axios.get(`https://cms-qdb.onrender.com/categories`).then((response) => {
                    setGetallcate(response.data)
                })
            }
        }).catch((error) => {
            console.log(error)
        })
        console.log(cname)
    }

    const putCategory = async (e, id) => {
        e.preventDefault()
        axios.put(`https://cms-qdb.onrender.com/categories/${id}/update_category`, {
            cat_name: cname,
            cat_desc: cdesc,
            c_id: id
        }).then((response) => {
            if (response.status == 207) {
                alert("Aleady Exist")
            }
            else {
                axios.get(`https://cms-qdb.onrender.com/categories`).then((response) => {
                    setGetallcate(response.data)
                })
            }
        })
    }

    const getCategoryById = async (id) => {
        axios.get(`https://cms-qdb.onrender.com/categories/${id}`).then((response) => {
            setGetcate(response.data)
            setCname(response.data[0].cat_name)
            setCdesc(response.data[0].cat_desc)
        }).then(() => {
            penC()
            handleRefresh()
        })
    }


    useEffect(() => {
        axios.get(`https://cms-qdb.onrender.com/categories`).then((response) => {
            setGetallcate(response.data)
        })
    }, []);

    return (
        <Header>
            <div className={style.all}>
                <div className={style.cate}>
                    <div className={post === true ? style.cates : style.none}>
                        <button className={style.add} onClick={clickC}>+ Add Category</button>
                        {getallcate && getallcate.map((post, index) => (
                            <div className={style.posts} onClick={() => getCategoryById(post.cat_id)} key={index}>
                                <p className={style.p}>{post.cat_name}</p>
                                <FontAwesomeIcon icon={faPen} className={style.pen} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={crCate || c === true ? style.post : style.none}>
                    <div className={crCate === true ? style.block : style.none}>
                        <div>
                            <form onSubmit={postCategory} className={style.form}>
                                <div className={style.fdiv}>
                                    <label>Category Name <span style={{ color: "red" }}>&#42;</span></label>
                                    <input className={style.input} type="text" onChange={e => setCname(e.target.value)} />
                                </div>
                                <div className={style.fdiv}>
                                    <label>Category Description <span style={{ color: "red" }}>&#42;</span></label>
                                    <textarea className={style.textarea} as="textarea" rows={3} onChange={e => setCdesc(e.target.value)} />
                                </div>
                                <button className={style.button} type="submit">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={c === true ? style.block : style.none} key={refreshKey}>
                        {getcate && getcate.map((post, index) => (
                            <div key={index}>
                                <form onSubmit={(e) => putCategory(e, post.cat_id)} className={style.form}>
                                    <div className={style.fdiv}>
                                        <label>Category Name <span style={{ color: "red" }}>&#42;</span></label>
                                        <input className={style.input} type="text" onChange={e => setCname(e.target.value)} defaultValue={post.cat_name} />
                                    </div>
                                    <div className={style.fdiv}>
                                        <label>Category Description <span style={{ color: "red" }}>&#42;</span></label>
                                        <textarea className={style.textarea} as="textarea" rows={3} onChange={e => setCdesc(e.target.value)} defaultValue={post.cat_desc} />
                                    </div>
                                    <button className={style.button} type="submit">
                                        Create
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default index
