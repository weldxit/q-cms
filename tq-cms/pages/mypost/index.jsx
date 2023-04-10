import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../../styles/post.module.css'
import Header from '../../components/header'
import Preview from '../../components/preview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const index = () => {

    const router = useRouter()

    const [imageUrl, setImageUrl] = useState();
    const [ptitle, setPtitle] = useState();
    const [pslug, setPslug] = useState();
    const [pcate, setPcate] = useState();
    const [pauth, setPauth] = useState();
    const [pimg, setPimg] = useState('');
    const [pdate, setPdate] = useState();
    const [pdesc, setPdesc] = useState();
    const [getallpost, setGetallpost] = useState();
    const [getpost, setGetpost] = useState();
    const [spl, setSpl] = useState();
    const [refreshKey, setRefreshKey] = useState(0);
    const [pre, setPre] = useState(false);
    const [post, setPost] = useState(true);
    const [apic, setApic] = useState();
    const [aname, setAname] = useState();

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const getStoryById = async (id) => {
        await axios.get(`https://cms-qdb.onrender.com/posts/${id}/post`).then((response) => {
            setGetpost(response.data)
            setPtitle(response.data[0].title)
            setPdesc(response.data[0].post_desc)
            setPdate(response.data[0].post_date)
            setPslug(response.data[0].slug)
            setSpl(response.data[0].special)
            setPcate(response.data[0].cat_id)
            setPauth(response.data[0].author_id)
            setPimg(response.data[0].image_file)
            setImageUrl(response.data[0].image_file)
            setApic(response.data[0].author_img)
            setAname(response.data[0].author_name)
        }).then(() => {
            handleRefresh();
            setPre(true);
        })
    }


    useEffect(() => {
        var id = localStorage.getItem(`authId`);
        axios.get(`https://cms-qdb.onrender.com/posts/author/${id}`).then((response) => {
            setGetallpost(response.data)
        })
    }, []);

    return (
        <Header>
            <div className={style.all}>
                <div className={style.cate}>
                    <div className={post === true ? style.cates : style.none}>
                        <button className={style.add} onClick={() => router.push(`/mypost/add-post`)}>+ Add Post</button>
                        {getallpost && getallpost.map((post, index) => (
                            <div className={style.posts} key={index}>
                                <p className={style.p} onClick={() => getStoryById(post.post_id)}>{post.title}</p>
                                <FontAwesomeIcon icon={faPen} className={style.pen} onClick={() => router.push(`/mypost/${post.post_id}`)}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.post}>
                    <div className={pre === true ? style.wh : style.none}>
                        <Preview
                            image_file={pimg}
                            title={ptitle}
                            post_desc={pdesc}
                            author_img={apic}
                            author_name={aname}
                            post_date={pdate ? pdate.slice(0,10) : ''}
                            user_name="Om Prakash Meher"
                            cmt_date={pdate ? pdate.slice(0,10) : ''}
                            comment_desc="ପୋଷ୍ଟ ଟା ବଢିଆ ହେଇଛି।"
                        />
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default index
