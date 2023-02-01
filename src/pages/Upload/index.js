/* eslint-disable jsx-a11y/alt-text */
import { faCircleExclamation, faCloudArrowUp, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Upload.module.scss';
import AccountItem from '../../components/AccountItem';
import * as followingService from '~/services/followingService';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts.js'

const cx = classNames.bind(styles);

/* eslint-disable no-unreachable */
function Upload() {
    const MENU_LANGUAGES = [
        'VietNam',
        'Japan',
        'Korea',
        'America',
        'English',
        'Canada',
        'Bahasa Indonesia (Indonesia)',
        'English',
        'Canada',
        'Bahasa Indonesia (Indonesia)',
        'Romani',
        'Basa Jawa (Indonesia)',
        'Bahasa Indonesia (Indonesia)',
        'English',
        'Canada',
        'Bahasa Indonesia (Indonesia)',
        'Romani',
        'Basa Jawa (Indonesia)',
        'Bahasa Indonesia (Indonesia)',
        'English',
        'Canada',
        'Bahasa Indonesia (Indonesia)',
        'Romani',
        'Basa Jawa (Indonesia)',
        'Bahasa Indonesia (Indonesia)',
        'English',
        'Canada',
        'Bahasa Indonesia (Indonesia)',
        'Romani',
        'Basa Jawa (Indonesia)',
    ];

    const MENU_WATCHINGS = ['Public', 'Friends', 'Private'];

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        followingService
            .getFollowing({ perPage: 5 })
            .then((data) => {
                setFollowing(data);
            })
            .catch((error) => console.log(error));
    },[]);

    const captionFocus = useRef();
    
    const [selectLanguage, setSelectLanguage] = useState(false);
    const [switchCheck, setSwitchCheck] = useState(false);
    const [selectWatching, setSelectWatching] = useState(false);
    const [chooseWatching, setChooseWatching] = useState('Public');
    const [captionValue, setCaptionValue] = useState('');
    const [searchCaption, setSearchCaption] = useState(false)

    const handleLanguage = () => {
        setSelectLanguage(!selectLanguage);
    };

    const handleSwitch = () => {
        setSwitchCheck(!switchCheck);
    };

    const handleSelectWatching = () => {
        setSelectWatching(!selectWatching);
    };

    const handleSelect = (select) => {
        setChooseWatching(select);
        setSelectWatching(!selectWatching);
    };

    const handleInputCaption = (e) => {
        setCaptionValue(e.target.value);
    };

    const handleSearchCaption = () => {
        setSearchCaption(!searchCaption);
        setCaptionValue(prev => (`${prev}@`));
    }

    const handleInputCaptionFollow = () => {
        setCaptionValue(prev => `${prev}@${following[0].nickname}`);
        setSearchCaption(!searchCaption);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                {/* HEADER */}
                <div className={cx('header')}>
                    <h3>Upload video</h3>
                    <span>Post a video to your account</span>
                </div>

                {/* CONTENT */}
                <div className={cx('content')}>
                    <div className={cx('upload-img')}>
                        <FontAwesomeIcon className={cx('icon-cloud')} icon={faCloudArrowUp} />
                        <span className={cx('item-1')}>Select video to upload</span>
                        <span className={cx('item-2')}>Or drag and drop a file</span>
                        <span className={cx('item-3')}>MP4 or WebM</span>
                        <span className={cx('item-3')}>720x1280 resolution or higher</span>
                        <span className={cx('item-3')}>Up to 30 minutes</span>
                        <span className={cx('item-3')}>Less than 2 GB</span>
                        <Button className={cx('select-btn')} primary>
                            Select file
                        </Button>
                    </div>
                    <div className={cx('upload-video')}>
                        <div className={cx('editor')}>
                            <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg" />
                            <div className={cx('content-edit')}>
                                <h4>Divide videos and edit</h4>
                                <p>
                                    You can quickly divide videos into multiple parts, remove redundant parts and turn
                                    landscape videos into portrait videos
                                </p>
                            </div>
                            <Button primary>Edit</Button>
                        </div>
                        <div className={cx('wrapper-tippyCaption')}>
                            <HeadlessTippy
                                interactive
                                visible={searchCaption}
                                placement={'bottom-start'}
                                offset={[0,4]}
                                render={(attrs) => (
                                    <div className={cx('search-result-caption')} tabIndex="-1" {...attrs}>
                                        <SuggestedAccounts label="Following" data={following} checkPageUpload={true} onClick={handleInputCaptionFollow}/>
                                    </div>
                                )}
                                /* onClickOutside={handleHideResult} */
                            >
                                <div className={cx('caption')}>
                                    <span className={cx('caption-item')}>
                                        <h4>Caption</h4>
                                        <p>{captionValue.length} / 150</p>
                                    </span>
                                    <input
                                        maxLength="150"
                                        ref={captionFocus}
                                        value={captionValue}
                                        onChange={handleInputCaption}
                                    />
                                    <div className={cx('wrapper-charactor')}>
                                        <span className={cx('caption-charactor1')} onClick={handleSearchCaption}>@</span>
                                        <span className={cx('caption-charactor2')}>#</span>
                                    </div>
                                </div>
                            </HeadlessTippy>
                        </div>
                        <div className={cx('cover')}>
                            <h4>Cover</h4>
                            <div className={cx('wrapper-cover')}>
                                <span></span>
                            </div>
                        </div>
                        <div className={cx('watching-video')}>
                            <h4>Whocan watch this video</h4>
                            <div>
                                <Tippy
                                    interactive
                                    visible={selectWatching}
                                    offset={[0, 2]}
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                            <div className={cx('wrapper-tippy-watching')}>
                                                {MENU_WATCHINGS.map((watching, index) =>
                                                    watching === chooseWatching ? (
                                                        <button
                                                            key={index}
                                                            className={cx('tippy-watching-item-select')}
                                                            onClick={() => handleSelect(watching)}
                                                        >
                                                            <p>{watching}</p>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            key={index}
                                                            className={cx('tippy-watching-item')}
                                                            onClick={() => handleSelect(watching)}
                                                        >
                                                            <p>{watching}</p>
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    onClickOutside={handleSelectWatching}
                                >
                                    <button className={cx('select-watching')} onClick={handleSelectWatching}>
                                        <p>{chooseWatching}</p>
                                        {!selectWatching && (
                                            <FontAwesomeIcon className={cx('icon-down')} icon={faSortDown} />
                                        )}
                                        {selectWatching && (
                                            <FontAwesomeIcon className={cx('icon-up')} icon={faSortUp} />
                                        )}
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        <div className={cx('wrapper-checkbox')}>
                            <h4>Allow users to:</h4>
                            <div className={cx('checkbox')}>
                                <div className={cx('checkbox-item')}>
                                    <label className={cx('title-checkbox')}>
                                        <span>Comment</span>
                                    </label>
                                    <div className={cx('input-check')}>
                                        <input type={'checkbox'} />
                                    </div>
                                </div>
                                <div className={cx('checkbox-item')}>
                                    <label className={cx('title-checkbox')}>
                                        <span>Duet</span>
                                    </label>
                                    <div className={cx('input-check')}>
                                        <input type={'checkbox'} />
                                    </div>
                                </div>
                                <div className={cx('checkbox-item')}>
                                    <label className={cx('title-checkbox')}>
                                        <span>Stitch</span>
                                    </label>
                                    <div className={cx('input-check')}>
                                        <input type={'checkbox'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('switch-wrap')}>
                            <div className={cx('content-switch')}>
                                <h4>Run a copyright check</h4>
                                {switchCheck ? (
                                    <div className={cx('switch-check')} onClick={handleSwitch}>
                                        <input type="checkbox" className={cx('toggle-switch')} />
                                    </div>
                                ) : (
                                    <div className={cx('switch-check-true')} onClick={handleSwitch}>
                                        <input type="checkbox" className={cx('toggle-switch')} />
                                    </div>
                                )}
                            </div>
                            {switchCheck ? (
                                <div className={cx('title-switch-wrapper')}>
                                    <FontAwesomeIcon className={cx('icon-switch')} icon={faCircleExclamation} />
                                    <p className={cx('title-switch-true')}>
                                        Copyright check will not begin until your video is uploaded.
                                    </p>
                                </div>
                            ) : (
                                <p className={cx('title-switch')}>
                                    We'll check your video for potential copyright infringements on used sounds. If
                                    infringements are found, you can edit the video before posting.{' '}
                                    <strong>Learn more</strong>
                                </p>
                            )}
                        </div>
                        <div className={cx('btn-row')}>
                            <button className={cx('btn-1')}>
                                <h4>Discard</h4>
                            </button>
                            <button className={cx('btn-2')}>
                                <h4>Post</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className={cx('footer-upload')}>
                <div className={cx('footer-item')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img
                            className={cx('logo')}
                            src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                            title="TikTok"
                        />
                        <img
                            className={cx('tiktok')}
                            src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg"
                            title="TikTok"
                        />
                    </Link>
                    <div className={cx('item-link')}>
                        <div className={cx('content-item')}>
                            <h4>Company</h4>
                            <span>
                                <a href="/">
                                    <h5>About</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Newsroom</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Contact</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Careers</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>ByteDance</h5>
                                </a>
                            </span>
                        </div>
                        <div className={cx('content-item')}>
                            <h4>Company</h4>
                            <span>
                                <a href="/">
                                    <h5>About</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Newsroom</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Contact</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Careers</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>ByteDance</h5>
                                </a>
                            </span>
                        </div>
                        <div className={cx('content-item')}>
                            <h4>Company</h4>
                            <span>
                                <a href="/">
                                    <h5>About</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Newsroom</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Contact</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Careers</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>ByteDance</h5>
                                </a>
                            </span>
                        </div>
                        <div className={cx('content-item')}>
                            <h4>Company</h4>
                            <span>
                                <a href="/">
                                    <h5>About</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Newsroom</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Contact</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>Careers</h5>
                                </a>
                            </span>
                            <span>
                                <a href="/">
                                    <h5>ByteDance</h5>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-language')} onClick={handleLanguage}>
                    <div>
                        <Tippy
                            interactive
                            visible={selectLanguage}
                            offset={[30, 2]}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <div className={cx('wrapper-tippy-language')}>
                                        {MENU_LANGUAGES.map((language, index) => (
                                            <button key={index} className={cx('tippy-language-item')}>
                                                <p>{language}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            onClickOutside={handleLanguage}
                        >
                            <button className={cx('item-language')}>
                                <p>English</p>
                                <FontAwesomeIcon className={cx('icon-down')} icon={faSortDown} />
                            </button>
                        </Tippy>
                    </div>
                    <span>© 2022 TikTok</span>
                </div>
            </div>
        </div>
    );
}

export default Upload;
