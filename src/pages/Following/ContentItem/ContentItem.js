import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import ReactPlayer from 'react-player';
import {
    faCheckCircle,
    faChevronDown,
    faCircleQuestion,
    faCode,
    faCoins,
    faCommentDots,
    faEnvelope,
    faGear,
    faHeart,
    faKeyboard,
    faLanguage,
    faLink,
    faPaperPlane,
    faShare,
    faSignOut,
    faUser,
    faVoicemail,
} from '@fortawesome/free-solid-svg-icons';

import videos from '~/assets/videos';
import styles from './ContentItem.module.scss';
import AccountPreview from './AccountPreview';
import Menu from '~/components/Popper/Menu';
import { faFacebook, faFacebookF, faLine, faLinkedinIn, faPinterest, faReddit, faSquareWhatsapp, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Button from '~/components/Button';
import { Player } from 'video-react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faCode} />,
        type: 'code',
        title: 'Embed',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        type: 'send',
        title: 'Send to friends',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faFacebookF} />,
        type: 'facebook',
        title: 'Share to Facebook',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faWhatsapp} />,
        type: 'whatsapp',
        title: 'Share to WhatsApp',
        to: '/settings',
    },
    {
        icon: <FontAwesomeIcon icon={faLink} />,
        type: 'copylink',
        title: 'Copy link',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faTwitter} />,
        type: 'twitter',
        title: 'Share to Twitter',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faLinkedinIn} />,
        type: 'linkedin',
        title: 'Share to LinkedIn',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faReddit} />,
        type: 'reddit',
        title: 'Share to Reddit',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        type: 'telegram',
        title: 'Share to Telegram',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        type: 'email',
        title: 'Share to Email',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faLine} />,
        type: 'line',
        title: 'Share to Line',
        to: '/logout',
    },
    {
        icon: <FontAwesomeIcon icon={faPinterest} />,
        type: 'pinterest',
        title: 'Share to Pinterest',
        to: '/logout',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCode} />,
        type: 'code',
        title: 'Embed',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        type: 'send',
        title: 'Send to friends',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faFacebookF} />,
        type: 'facebook',
        title: 'Share to Facebook',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faWhatsapp} />,
        type: 'whatsapp',
        title: 'Share to WhatsApp',
        to: '/settings',
    },
    {
        icon: <FontAwesomeIcon icon={faLink} />,
        type: 'copylink',
        title: 'Copy link',
        to: '/logout',
    },
    {
        title: '',
        type: 'add',
        icon: <FontAwesomeIcon icon={faChevronDown} />,
        children: {
            title: 'add',
            data: [...MENU_ITEMS],
        },
    },
];


function ContentItem({ nickName, userName, imgAccount, tick, description, follow, like, comment, share, video }) {
    const hanldeMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                //Handle change language
                break;
                default:
                }
            };
    const renderPreview = ({ imgAccount, nickName, userName, tick, follow, like }, attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <AccountPreview
                    imgAccount={imgAccount}
                    nickName={nickName}
                    userName={userName}
                    tick={tick}
                    follow={follow}
                    like={like}
                />
            </div>
        );
    };

    return (
        <div className={cx('wrapper-content')}>
            <div className={cx('content-item')}>
                <Tippy
                    interactive
                    placement="bottom-start"
                    delay={[500, 0]}
                    render={() => renderPreview({ imgAccount, nickName, userName, tick, follow, like })}
                >
                    <div className={cx('wrapper-tippy-content')}>
                        <Link to={`/@${nickName}`}>
                            <img className={cx('avatar')} src={imgAccount} alt={'imgUser'} />
                        </Link>
                        <Link to={`/@${nickName}`}>
                            <div className={cx('account-item')}>
                                <div className={cx('item-info')}>
                                    <p className={cx('nickname')}>
                                        <strong>{nickName}</strong>
                                        {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                                    </p>
                                    <p className={cx('name')}>{userName}</p>
                                </div>
                                <p className={cx('content-item-info')}>{description}</p>
                            </div>
                        </Link>
                    </div>
                </Tippy>

                <div className={cx('wrapper-video-item')}>
                    <video
                        controls
                        className={cx('video-item')}
                        src={video}
                    />
                    <div className={cx('wrapper-interactive')}>
                        <button className={cx('icon-interactive')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                        </button>
                        <strong className={cx('title-icon')}>{like}</strong>
                        <button className={cx('icon-interactive')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faCommentDots} />
                        </button>
                        <strong className={cx('title-icon')}>{comment}</strong>
                        <>
                            <Menu
                                items={userMenu}
                                onChange={hanldeMenuChange}
                                offset={[150, 8]}
                                popperWrapper="menu-share"
                            >
                                <button className={cx('icon-interactive')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                                </button>
                            </Menu>
                        </>
                        <strong className={cx('title-icon')}>{share}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentItem;
