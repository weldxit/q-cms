import Image from 'next/image'
import React from 'react'
import style from '../../styles/reg.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: 'AKIAZR7SRGPF6KLXGIUF',
    secretAccessKey: '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',
    region: 'ap-south-1',
    signatureVersion: 'v4',
});

const Index = () => {


    const router = useRouter()

    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [img, setImg] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [dob, setDob] = useState();
    const [pwd, setPwd] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [err, setErr] = useState(false);

    const s3 = new AWS.S3();

    const uploadToS3 = async (e) => {
        setDob(e.target.value)
        const params = {
            Bucket: 'quiver-news',
            Key: `${Date.now()}.${img.name}`,
            Body: img
        };
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
        console.log('uploading to s3', Location);
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        await axios.post(`https://cms-qdb.onrender.com/authors/new_author`, {
            author_name: name,
            bio: bio,
            author_img: imageUrl,
            phone: phone,
            email: email,
            address: address,
            dob: dob,
            pwd: pwd
        }).then((response) => {
            router.push(`/`);
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
                <h1>Register</h1>
                {err ? <p style={{ color: "#f00" }}>Registration Faild!, Try Again.</p> : <></>}
                <form className={style.form} onSubmit={submitRegister}>
                    <div className={style.fdiv}>
                        <label>Name <span style={{ color: "#f00" }}>&#42;</span></label>
                        <input className={style.input} type="text" required onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={style.fdiv}>
                        <label>Bio <span style={{ color: "#f00" }}>&#42;</span></label>
                        <input className={style.input} type="text" required onChange={e => setBio(e.target.value)} />
                    </div>
                    <div className={style.fdiv}>
                        <label>Profile Image <span style={{ color: "#f00" }}>&#42;</span></label>
                        <input className={style.input} type="file" accept='image/*' required onChange={e => setImg(e.target.files[0])} />
                    </div>
                    <div className={style.fdiv}>
                        <label>Address <span style={{ color: "#f00" }}>&#42;</span></label>
                        <input className={style.input} type="text" required onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className={style.fdiv1}>
                        <div className={style.fdiv2}>
                            <label>Date of Birth <span style={{ color: "#f00" }}>&#42;</span></label>
                            <input className={style.input} type="date" required onChange={uploadToS3} />
                        </div>
                        <div className={style.fdiv2}>
                            <label>Phone Number <span style={{ color: "#f00" }}>&#42;</span></label>
                            <input className={style.input} type="text" required onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className={style.fdiv1}>
                        <div className={style.fdiv2}>
                            <label>Email Address <span style={{ color: "#f00" }}>&#42;</span></label>
                            <input className={style.input} type="email" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className={style.fdiv2}>
                            <label>Password <span style={{ color: "#f00" }}>&#42;</span></label>
                            <input className={style.input} type="password" required onChange={e => setPwd(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className={style.button}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Index
