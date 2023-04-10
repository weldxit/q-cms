import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/singlearticle.module.css";
import Image from "next/image";
import parse from 'html-react-parser';

import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import axios from "axios";

const Preview = (props) => {
  //   const router = useRouter();
  //   const { articleId } = router.query;
  const shareUrl = `https://www.thequiver.in/`

  //   const [news, setNews] = useState();
  //   const [cmnt, setCmnt] = useState();
  //   useEffect(() => {
  //     axios.get(`https://cms-qdb.onrender.com/posts/${articleId[1]}/post`).then((response) => {
  //       setNews(response.data)
  //     })
  //     axios.get(`https://cms-qdb.onrender.com/comments/${articleId[1]}`).then((response) => {
  //       setCmnt(response.data)
  //     })
  //     axios.get(`https://cms-qdb.onrender.com/posts/${articleId[1]}/c`)
  //   }, []);

  //   const [cdesc, setCdesc] = useState();
  //   const [cname, setCname] = useState();

  //   const postComment = async () => {
  //     axios.post(`https://cms-qdb.onrender.com/comments/${articleId[1]}/new_comment`, {
  //       comment_desc: cdesc,
  //       user_name: cname,
  //     }).then((response) => {
  //       console.log(response);
  //       axios.get(`https://cms-qdb.onrender.com/comments/${articleId[1]}`).then((response) => {
  //         setCmnt(response.data)
  //       })
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  //   }

  return (
    <div className={styles.main}>
      <div className={styles.singlearticlecontainer}>
        <div className={styles.articleimage}>
          <Image src={props.image_file} alt="big data" fill={true} />
        </div>
        <div className={styles.headingdiv}>

          <h1 className={styles.articleheading}>{props.title}</h1>
        </div>
        <div className={styles.articlecontent}>
          <div className={styles.textdiv}>
            <p className={styles.articletext}>
              <span>{props.post_desc ? parse(props.post_desc.slice(0, 300)) : ''}</span>
              {props.yt_desc ? <iframe className={styles.frame} src={`https://www.youtube.com/embed/${(props.yt_desc)}?rel=0`} title="YouTube video player" frameborder="0" allow=" autoplay; clipboard-write; encrypted-media; gyroscope; web-share" allowfullscreen></iframe> : <></>}
              <span>{props.post_desc ? parse(props.post_desc.slice(300)) : ''}</span>
            </p>
          </div>
          <div className={styles.sharearticle}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} />
            </FacebookShareButton>&nbsp;&nbsp;
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={40} />
            </LinkedinShareButton>&nbsp;&nbsp;
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={40} />
            </EmailShareButton>&nbsp;&nbsp;
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={40} />
            </TelegramShareButton>&nbsp;&nbsp;
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={40} />
            </WhatsappShareButton>&nbsp;&nbsp;
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} />
            </TwitterShareButton>
          </div>
        </div>
        <div className={styles.editor}>
          <div>
            <Image src={props.author_img} width={60} height={60} style={{ borderRadius: "50%" }} />
          </div>
          <div>
            <h4>{props.author_name}</h4>
            <p>{props.post_date}</p>
          </div>
        </div>
        <div className={styles.editorc}>
          <div className={styles.commentsec}>
            <h4>{props.user_name}</h4>
            <p>{props.cmt_date}</p>
          </div>
          <p>{props.comment_desc}</p>
        </div>
        <div className={styles.comment}>
          <h2>Leave a Comment</h2><br />
          <div className={styles.form}>
            <label htmlFor="name">Name *</label><br />
            <input type="text" className={styles.inp} /><br /><br />
            <label htmlFor="comment">Comment *</label><br />
            <textarea className={styles.ta} ></textarea><br /><br />
            <input type="submit" value="Post Comment" className={styles.btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
