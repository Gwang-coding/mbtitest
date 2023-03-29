import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import mdata from '/data/mbti.json';
import sdata from '/data/score.json';
import fdata from '/data/famous.json';

export default function Home() {
    return (
        <>
            <Head>
                <title>mbti</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.page}>
                <div className={styles.title}>
                    <p>인기 심리테스트</p>
                </div>
                <div className={styles.box}>
                    {fdata.map((item, index) => {
                        return (
                            <div key={index}>
                                <Link href={item.url} className={styles.boxtext}>
                                    <Image src={item.img} width={150} height={80} alt="" />
                                    <p>{item.title}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.title}>
                    <p>MBTI 테스트</p>
                </div>
                <div className={styles.box}>
                    {mdata.map((item, index) => {
                        return (
                            <div key={index}>
                                <Link href={item.url} className={styles.boxtext}>
                                    <Image src={item.img} width={150} height={80} alt="" />
                                    <p>{item.title}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.title}>
                    <p className={styles.testtitle}>SCORE 테스트</p>
                </div>
                <div className={styles.box}>
                    {sdata.map((item, index) => {
                        return (
                            <div key={index}>
                                <Link href={item.url} className={styles.boxtext}>
                                    <Image src={item.img} width={150} height={80} alt="" />
                                    <p>{item.title}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
