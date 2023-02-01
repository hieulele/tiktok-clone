import classNames from 'classnames/bind';

import styles from './FooterSidebar.module.scss';

const cx = classNames.bind(styles);

function FooterSidebar({label}) {
    return (
        <a className={cx('footersidebar')} href={`/${label}`}>{label}</a>
    );
}

export default FooterSidebar;
