import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCircleQuestion,
    faCoins,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faLanguage,
    faPlus,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import { NotiIcon, MessIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    // Handle logic
    const hanldeMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                //Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    const itemMenuHeader = [
        {
            title: 'Chuyên Khoa',
            description: 'Tìm bác sĩ theo chuyên khoa',
        },
        {
            title: 'Cơ sở y tế',
            description: 'Chọn bệnh viện phòng khám',
        },
        {
            title: 'Bác sĩ',
            description: 'Chọn bác sĩ giỏi',
        },
        {
            title: 'Gói khám',
            description: 'Khám sức khỏe tổng quát',
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('wrapper-logo')}>
                    <FontAwesomeIcon className={cx('icon-bar')} icon={faBars} />
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="BookingCare" />
                    </Link>
                </div>
                <ul className={cx('wrapper-item-header')}>
                    {itemMenuHeader &&
                        itemMenuHeader.map((item) => (
                            <li className={cx('item-header')}>
                                <h3>{item.title}</h3>
                                <p className={cx('title-item-header')}>{item.description}</p>
                            </li>
                        ))}
                </ul>
                <div className={cx('wrapper-support')}>
                    <a>
                        <span className={cx('support')}>
                            <FontAwesomeIcon className={cx('icon-support')} icon={faCircleQuestion}/>
                            <h5>Hỗ Trợ</h5>
                        </span>
                        <span className={cx('phone-number')}>024-7301-2468</span>
                    </a>
                </div>
                {/* <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Link to={config.routes.upload}>
                                <Button upload>
                                    <FontAwesomeIcon className={cx('icon-upload')} icon={faPlus} />
                                    Upload
                                </Button>
                            </Link>
                            <Tippy
                                className={cx('Message')}
                                delay={[0, 100]}
                                arrow
                                offset={[10, 4]}
                                content="Message"
                                placement="bottom"
                            >
                                <button className={cx('action-btn', 'MessIcon')}>
                                    <MessIcon className={cx('MessIcon')} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} offset={[0, 4]} content="Notifice" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <NotiIcon className={cx('NotiIcon')} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button upload>
                                <FontAwesomeIcon className={cx('icon-upload')} icon={faPlus} />
                                Upload
                            </Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={hanldeMenuChange}
                        offset={[12, 8]}
                        popperWrapper="menu-popper"
                        color="menu-popper-color"
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/2bf9decb3633a0196e8eb6889f34683e~c5_100x100.jpeg?x-expires=1669752000&x-signature=MZcz1UajnIxN%2B4XQkjUd2hy%2Bbio%3D"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div> */}
            </div>
        </header>
    );
}

export default Header;
