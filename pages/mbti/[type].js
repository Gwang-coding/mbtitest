import React, { useState, useEffect } from 'react';
import { shareKakao } from '@/src/utils/sharekakaotalk';
import Image from 'next/image';
import styles from '@/styles/MBTI.module.css';
import Link from 'next/link';
import cdata from '/data/commend.json';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Index({ type }) {
    const qdata = require(`/data/${type}/questions.json`); //질문 json
    const mdata = require(`/data/${type}/meta.json`); // 카테고리 json
    const rdata = require(`/data/${type}/resultType.json`); // 결과 창 json
    const idata = require(`/data/${type}/images.json`); // 결과 창 json
    const [checkedInputs, setCheckedInputs] = useState([]); // 질문에 답 클릭시 E,I,S...등의 mbti내용을 배열에 저장
    const [count, setCount] = useState(0); // 질문 선택 수
    const [file, setFile] = useState('start'); // 페이지 단계
    const [MBTI, setMBTI] = useState(''); // MBTI 저장

    useEffect(() => {
        const script = document.createElement('script');  //



        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';



        script.async = true;



        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);
    const changeHandler = (id) => {
        // 클릭시 MBTI 저장
        setCheckedInputs([...checkedInputs, id]);
    };

    const mbtiarr = ['E', 'I', 'S', 'N', 'T', 'F', 'P', 'J']; // MBTI 배열
    function checkmbti(arr) {
        // 결과창 이전에 선택한 MBTI를 계산
        for (let i = 0; i < 8; i += 2) {
            // E,I/ S,N / T,F / P,J  두개씩 4번
            var countone = checkedInputs.filter((item) => item === mbtiarr[i]).length; //개수확인
            var counttwo = checkedInputs.filter((item) => item === mbtiarr[i + 1]).length;
            if (counttwo >= countone) {
                //더많거나 같은 개수 삽입
                arr += mbtiarr[i + 1];
            } else {
                arr += mbtiarr[i];
            }
        }
        return arr; //삽입된 배열 내보내기
    }
    function add_count() {
        //클릭시 숫자를 더해주고 11번째로 끝나게 되면 계산과 동시에 결과창 출력
        if (count === 11) {
            setMBTI(checkmbti(MBTI));
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
                    <p>{count + 1}/12</p>
                </div>
                <div className={styles.questionprogress}>
                    <div className="progress" />
                </div>
                <style jsx>
                    {`
                        .progress {
                            background-color: black;
                            width: ${count * 8.4 + 8.4 + '%'};
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
                <p className={styles.questiondesc}>{qdata[count].question}</p>
                <div
                    onClick={() => {
                        changeHandler(qdata[count].answer1.result);
                        add_count();
                    }}
                >
                    <div className={styles.btn}>{qdata[count].answer1.text}</div>
                </div>
                <div
                    onClick={() => {
                        changeHandler(qdata[count].answer2.result);
                        add_count();
                    }}
                >
                    <div className={styles.btn}>{qdata[count].answer2.text}</div>
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
                    <span className={styles.resultname}>{mdata.resultTopText}</span>
                    <span>{mdata.resultBottomText}</span>
                </div>
                <Image style={{ margin: '20px' }} src={idata[MBTI]} width={200} height={240} alt="" />
                <div className={styles.resulttextbox}>
                    <div className={styles.resulttitle}>
                        <span className={styles.resultname}>{rdata[MBTI].name}</span>
                        <span>
                            {MBTI} {rdata[MBTI].percent}
                        </span>
                    </div>

                    <div>{rdata[MBTI].summary}</div>
                    <br />
                    <div>
                        {rdata[MBTI].text1}
                        {rdata[MBTI].text2}
                    </div>
                </div>
                <div className={styles.resultshare}>
                    <p>친구에게 공유하기</p>
                    <div className={styles.resultshareimglist}>
                        <Image
                            onClick={() =>
                                shareKakao('http://localhost:3000', mdata.title, mdata.shareMentKakao, mdata.shareimg, rdata[MBTI].name)
                            }
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
                        <TwitterShareButton url="https://localhost:3000" title={[mdata.shareMentTwitter + rdata[MBTI].name + ' 입니다']}>
                            <TwitterIcon size={48} borderRadius={20} />
                        </TwitterShareButton>
                        <CopyToClipboard style={{ cursor: 'Pointer' }} text="https://naver.com">
                            <Image onClick={''} className={styles.resultshareimg} src="/images/link.png" width={50} height={50} alt="" />
                        </CopyToClipboard>
                    </div>
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
