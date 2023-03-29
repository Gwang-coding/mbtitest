import React, { useState } from 'react';
import styles from '@/styles/Top.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Top() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSide = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            <div className={styles.top}>
                <Image src="/images/menuimg.png" width={20} height={30} alt="" onClick={toggleSide} />
                {isOpen && (
                    <div>
                        <div className={styles.cancle} onClick={toggleSide} />
                        <div className={styles.SideBarWrap}>
                            <Link href="/" className={styles.link} onClick={toggleSide}>
                                메인화면
                            </Link>
                        </div>
                    </div>
                )}
                <div className={styles.menu}>
                    <Link href="/" className={styles.link}>
                        오테스트
                    </Link>
                </div>
            </div>
        </>
    );
}
