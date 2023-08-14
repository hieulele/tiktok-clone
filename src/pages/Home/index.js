import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Home.module.scss';
import * as contentService from '~/services/contentService';
import ContentItem from './ContentItem';
import videos from '~/assets/videos';
import Search from '../../layouts/components/Search';

const cx = classNames.bind(styles);

function Home() {
    const [content, setContent] = useState([]);

    const optionMedical = [
        {
            img: '/images/khamchuyenkhoa.png',
            title: `Khám Chuyên Khoa`
        },
        {
            img: '/images/khamtuxa.png',
            title: 'Khám từ xa'
        },
        {
            img: '/images/khamtongquat.png',
            title: 'Khám tổng quát'
        },
        {
            img: '/images/dichvuxetnghiem.png',
            title: 'Xét nghiệm y học'
        },
        {
            img: '/images/suckhoetinhthan.png',
            title: 'Sức khỏe tinh thần'
        },
        {
            img: '/images/khamnhakhoa.png',
            title: 'Khám nha khoa'
        },
        {
            img: '/images/phau-thuat.jpg',
            title: 'Gói phẫu thuật'
        },
        {
            img: '/images/khamtainha.png',
            title: 'Sản phẩm y tế'
        },
        {
            img: '/images/icon-bai-test-suc-khoe.png',
            title: 'Bài Test sức khỏe'
        },
    ]

    useEffect(() => {
        contentService
            .getContent({ perPage: 5 })
            .then((data) => {
                setContent(data);
            })
            .catch((error) => console.log(error));
    },[]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wapper-cover-background')}>
                <div className={cx('wrapper-search')}>
                    <h1 className={cx('title-main')}>
                        NỀN TẢNG Y TẾ <br/>
                        <b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b>
                    </h1>
                    <div className={cx('search')}><Search/></div>
                </div>
                <ul className={cx('wrapper-optionMedical')}>
                    { optionMedical.map(item => (
                        <li className={cx('wrapper-item-optionMedical')}>
                            <div className={cx('img-item-option')}>
                                <img src={item.img}/>
                            </div>
                            <h3>{item.title}</h3>
                        </li>
                    ))
                    }
                </ul>
                <div className={cx('')}></div>
            </div>
        </div>
    );
}

export default Home;
