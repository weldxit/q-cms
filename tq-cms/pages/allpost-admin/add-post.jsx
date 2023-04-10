import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../../styles/form.module.css'
import Header from '../../components/header'
import AWS from 'aws-sdk';
import Preview from '../../components/preview';
import { transliterate as tr, slugify as sl } from 'transliteration';
import Editor from '../../components/Editor'

AWS.config.update({
    accessKeyId: 'AKIAZR7SRGPF6KLXGIUF',
    secretAccessKey: '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',
    region: 'ap-south-1',
    signatureVersion: 'v4',
});

const Index = () => {
    const s3 = new AWS.S3();

    const uploadToS3P = async (e) => {
        setPdate(e.target.value)
        const params = {
            Bucket: 'quiver-news',
            Key: `${Date.now()}.${pimg.name}`,
            Body: pimg
        };
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
        console.log('uploading to s3', Location);
    }

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
    const [pre, setPre] = useState(false);
    const [post, setPost] = useState(true);
    const [apic, setApic] = useState();
    const [aname, setAname] = useState();
    const [getallauth, setGetallauth] = useState();
    const [getauth, setGetauth] = useState();
    const [getallcate, setGetallcate] = useState();
    const [yt, setYt] = useState();

    const postStory = async (e) => {
        e.preventDefault()
        axios.post(`https://cms-qdb.onrender.com/posts_new_post`, {
            title: ptitle,
            slug: pslug,
            cat_id: pcate,
            author_id: pauth,
            image_file: imageUrl,
            post_date: pdate,
            post_desc: pdesc,
            special: spl,
            yt_links: yt
        }).then((response) => {
            e.target.reset()
            axios.get(`https://cms-qdb.onrender.com/posts`).then((response) => {
                setGetallpost(response.data)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    const getAuthorById = async (id) => {
        setPauth(id)
        axios.get(`https://cms-qdb.onrender.com/authors/${id}`).then((response) => {
            setGetauth(response.data)
            setAname(response.data[0].author_name)
            setApic(response.data[0].author_img)
        })
    }

    useEffect(() => {
        var id = localStorage.getItem(`authId`);
        axios.get(`https://cms-qdb.onrender.com/categories`).then((response) => {
            setGetallcate(response.data)
        })
        axios.get(`https://cms-qdb.onrender.com/authors`).then((response) => {
            setGetallauth(response.data)
        })
        getAuthorById(id)
    }, []);

    const [slug, setSlug] = useState();

    const slugify = (data) => {
        setPtitle(data)
        const babu = sl(data);
        setSlug(babu)
        setPslug(babu)
    }

    const showPreview = async () => {
        setPre(!pre)
    }

    const description = async (val) => {
        setPdesc(val);
    }

    console.log(pdesc)

    return (
        <Header>
            <div>
                <div className={pre === false ? style.all : style.none}>
                    <div className={style.post}>
                        <div>
                            <form onSubmit={postStory} className={style.form}>
                                <div className={style.fdiv}>
                                    <label>Title <span style={{ color: "red" }}>&#42;</span></label>
                                    <input className={style.input} type="text" onChange={e => slugify(e.target.value)} />
                                </div>
                                <div className={style.fdiv}>
                                    <label>Slug <span style={{ color: "red" }}>&#42;</span></label>
                                    <input className={style.input}
                                        type='text'
                                        onChange={e => setPslug(e.target.value)}
                                        Value={slug ? slug : ''}
                                    />
                                </div>
                                <div className={style.fdiv1}>
                                    <div className={style.fdiv2}>
                                        <label>Category <span style={{ color: "red" }}>&#42;</span></label>
                                        <select className={style.input} onChange={e => setPcate(e.target.value)}>
                                            <option className={style.input}>-- Select Category --</option>
                                            {getallcate && getallcate.map((post, index) => (
                                                <option value={post.cat_id} key={index}>{post.cat_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={style.fdiv2}>
                                        <label>Youtube Link<span style={{ color: "red" }}>&#42;</span></label>
                                        <input type="text" className={style.input} onChange={e => setYt(e.target.value)} />
                                    </div>
                                </div>
                                <div className={style.fdiv1}>
                                    <div className={style.fdiv2}>
                                        <label>Thumbnail <span style={{ color: "red" }}>&#42;</span></label>
                                        <input className={style.input} type="file" accept='image/*' onChange={e => setPimg(e.target.files[0])} />
                                    </div>
                                    <div className={style.fdiv2}>
                                        <label>Publish Date <span style={{ color: "red" }}>&#42;</span></label>
                                        <input className={style.input} type="date" onChange={uploadToS3P} required />
                                    </div>
                                </div>
                                <div className={style.fdivc}>
                                    <label>Special News <span style={{ color: "red" }}>&#42;</span></label>
                                    <input
                                        type='checkbox'
                                        onChange={e => setSpl(e.target.value)}
                                    />
                                </div>
                                <div className={style.fdiv}>
                                    <label>Describe News <span style={{ color: "red" }}>&#42;</span></label>
                                    {/* <textarea className={style.textarea} as="textarea" rows={7} placeholder={'type or paste your report here ...'} onChange={e => setPdesc(e.target.value)} /> */}
                                    <Editor change={description} />
                                </div>
                                <div className={style.bdiv1}>
                                    <button className={style.button} type="submit">
                                        Post
                                    </button>
                                    <button className={style.button} onClick={showPreview} type='button'>
                                        Preview
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={pre === true ? style.wh : style.none}>
                    <button className={style.button1} onClick={showPreview}>&times;</button>
                    <Preview
                        image_file={imageUrl}
                        title={ptitle}
                        post_desc={pdesc}
                        author_img={apic}
                        author_name={aname}
                        post_date={pdate}
                        user_name="Om Prakash Meher"
                        cmt_date={pdate}
                        comment_desc="ପୋଷ୍ଟ ଟା ବଢିଆ ହେଇଛି।"
                        yt_desc={yt ? yt : undefined}
                    />
                </div>
            </div>
        </Header>
    )
}

export default Index
