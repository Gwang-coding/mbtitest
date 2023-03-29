import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/Score.module.css';
import { shareKakao } from '@/src/utils/sharekakaotalk';
import cdata from '/data/commend.json';
import Link from 'next/link';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Index({ type }) {
    const qdata = require(`/data/${type}/questions.json`); //질문 json
    const mdata = require(`/data/${type}/meta.json`);
    const idata = require(`/data/${type}/images.json`); // 카테고리 json
    const rdata = require(`/data/${type}/resultType.json`); // 결과 창 json
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [file, setFile] = useState('start');
    const [randomdata, setRandomdata] = useState([]);

    const randomValueFromArray = (array) => {
        const random = array.sort(() => 0.5 - Math.random());
        console.log(random);
        return random;
    };
    useEffect(() => {
        setRandomdata(randomValueFromArray(qdata));
    }, []);

    function add_count() {
        if (count === 9) {
            setFile('checkresult');
        } else {
            setCount(count + 1);
        }
    }
    if (file == 'start') {
        return (
            <>
                <div className={styles.startpage} onClick={() => setFile('question')}>
                    <p className={styles.starttitle}>{mdata.title}</p>
                    <p className={styles.startdesc}>{mdata.des}</p>
                    <div>
                        <Image src={idata.mainImage} width={200} height={320} alt="" />
                    </div>
                    <div>
                        <div className={styles.btn}>테스트 시작하기</div>
                    </div>
                </div>
            </>
        );
    } else if (file == 'question') {
        return (
            <div className={styles.page}>
                <div className={styles.questiontitle}>
                    <p>{mdata.title}</p>
                    <p>{count + 1}/10</p>
                </div>
                <div className={styles.questionprogress}>
                    <div className="progress" />
                </div>
                <style jsx>
                    {`
              .progress {
                background-color: black;
                width: ${count * 10 + 10 + '%'};
                height: 100%;
                transition: width 1s;
                border-radius: 2px;
              }

            }
          `}
                </style>
                <div className={styles.questionimages}>
                    <Image src={idata.survey1} width={190} height={190} alt="" />
                </div>
                <p className={styles.questiondesc}>{randomdata.question}</p>
                <div
                    onClick={() => {
                        setScore(score + randomdata[count].answer1.score);
                        add_count();
                    }}
                >
                    <p className={styles.btn}>{randomdata[count].answer1.text}</p>
                </div>

                <div
                    onClick={() => {
                        setScore(score + randomdata[count].answer2.score);
                        add_count();
                    }}
                >
                    <p className={styles.btn}>{randomdata[count].answer2.text}</p>
                </div>
                <div
                    onClick={() => {
                        setScore(score + randomdata[count].answer3.score);
                        add_count();
                    }}
                >
                    <p className={styles.btn}>{randomdata[count].answer3.text}</p>
                </div>

                <div
                    onClick={() => {
                        setScore(score + randomdata[count].answer4.score);
                        add_count();
                    }}
                >
                    <p className={styles.btn}>{randomdata[count].answer4.text}</p>
                </div>
            </div>
        );
    } else if (file == 'checkresult') {
        {
            setTimeout(() => {
                setFile('result');
            }, 2000);
        }
        return (
            <div className={styles.page}>
                <p>결과 확인중</p>
                <div className={styles.animation}></div>
            </div>
        );
    } else {
        return (
            <div className={styles.page}>
                <div className={styles.resulttop}>
                    <span className={styles.resultBottomText}>{mdata.title}</span>
                </div>
                <div className={styles.resultimage}>
                    <Image src="/images/cha.jpeg" width={200} height={240} alt="" />
                </div>

                <p className={styles.scoretext}>당신의 점수는?</p>
                <p className={styles.score}>{score}점</p>

                <p>친구에게 공유하기</p>
                <div className={styles.resultshareimglist}>
                    <Image
                        onClick={() => shareKakao('http://localhost:3000', mdata.title, mdata.shareMentKakao, mdata.shareimg, score + '점')}
                        className={styles.resultshareimg}
                        src="/images/kakaotalk.png"
                        style={{ cursor: 'Pointer' }}
                        width={50}
                        height={50}
                        alt=""
                    />
                    <FacebookShareButton url="https://naver.com">
                        <FacebookIcon size={48} borderRadius={20} />
                    </FacebookShareButton>
                    <TwitterShareButton url="https://localhost:3000" title={[mdata.shareMentTwitter + { score } + ' 입니다']}>
                        <TwitterIcon size={48} borderRadius={20} />
                    </TwitterShareButton>
                    <CopyToClipboard style={{ cursor: 'Pointer' }} text="https://naver.com">
                        <Image onClick={''} className={styles.resultshareimg} src="/images/link.png" width={50} height={50} alt="" />
                    </CopyToClipboard>
                </div>

                <div className={styles.resultboxlist}>
                    <div
                        onClick={() => {
                            setFile('start');
                            setCount(0);
                            setCheckedInputs([]);
                        }}
                        className={styles.btn}
                    >
                        테스트 다시하기
                    </div>
                    <div className={styles.title}>
                        <p>추천 테스트</p>
                    </div>
                    <div className={styles.box}>
                        {cdata.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link href={item.url} className={styles.commendtext}>
                                        <Image src={item.img} width={150} height={80} alt="" />
                                        <p>{item.title}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.btn}>
                        <Link href="/" className={styles.boxtext}>
                            더 많은 테스트 하러가기
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export const getServerSideProps = async ({ query }) => {
    const { type } = query;
    return { props: { type } };
};
