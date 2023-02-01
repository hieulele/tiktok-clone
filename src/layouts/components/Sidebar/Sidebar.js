import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import * as followingService from '~/services/followingService';
import Discover from './Discover';
import FooterSidebar from './FooterSidebar';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE)
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [onViewChange, setOnViewChange] = useState(true);

    const handleSeeAll = () => {
        setPage(page + 1);
        setOnViewChange(!onViewChange);
    }
    const handleSeeLess = () => {
        suggestedUsers.splice(5)
        setSuggestedUsers(suggestedUsers)
        setOnViewChange(!onViewChange);
    }

    useEffect(() => {
        userService
            .getSuggested({page, perPage: PER_PAGE})
            .then((data) => {
                setSuggestedUsers(prevUsers => [...prevUsers, ...data]);
            })
            .catch((error) => console.log(error));
    },[page]);

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        followingService
            .getFollowing({ perPage: 5 })
            .then((data) => {
                setFollowing(data);
            })
            .catch((error) => console.log(error));
    },[]);

    return (
        <aside className={cx('wrapper')}>
            <Menu className={cx('menu-sidebar')}>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} handleSeeAll={handleSeeAll} handleSeeLess={handleSeeLess} onViewChange={onViewChange}/>
            <SuggestedAccounts label="Following accounts" data={following} onViewChange={onViewChange}/>
            <div className={cx('discover')}>
                <p className={cx('label')}>Discover</p>
                <div className={cx('wrapper-list-hashtag')}>
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                    <Discover />
                </div>
            </div>
            <div className={cx('footer-sidebar')}>
                <div className={cx('footer-distance')}>
                    <FooterSidebar label="About" />
                    <FooterSidebar label="Newsroom" />
                    <FooterSidebar label="Contact" />
                    <FooterSidebar label="Careers" />
                    <FooterSidebar label="ByteDance" />
                </div>
                <div className={cx('footer-distance')}>
                    <FooterSidebar label="TikTok for Good" />
                    <FooterSidebar label="Advertise" />
                    <FooterSidebar label="Developers" />
                    <FooterSidebar label="Transparency" />
                    <FooterSidebar label="TikTok for Good" />
                    <FooterSidebar label="TikTok for Good" />
                </div>
                <div className={cx('footer-distance')}>
                    <FooterSidebar label="Help" />
                    <FooterSidebar label="Safety" />
                    <FooterSidebar label="Terms" />
                    <FooterSidebar label="Privacy" />
                    <FooterSidebar label="Creator Portal" />
                    <FooterSidebar label="Community Guidelines" />
                </div>
                <p className={cx('footer-text')}>© 2022 TikTok</p>
            </div>
        </aside>
    );
}

export default Sidebar;
