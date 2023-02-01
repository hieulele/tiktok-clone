import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';
import { Wrapper as PopperWrapper } from '../Popper';

const cx = classNames.bind(styles);

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

function AccountItem({ imgAccount, nickName, userName, tick, follow, like, checkPageUpload, onClick }) {
    return checkPageUpload ? (
        <div className={cx('account-item')} onClick={onClick}>
            <img className={cx('avatar')} src={imgAccount} alt="suggestedAccount" />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>{nickName}</strong>
                    {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>@{userName}</p>
            </div>
        </div>
    ) : (
        <div>
            <Tippy
                interactive
                placement="bottom-start"
                delay={[500, 0]}
                render={() => renderPreview({ imgAccount, nickName, userName, tick, follow, like })}
            >
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={imgAccount} alt="suggestedAccount" />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{nickName}</strong>
                            {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{userName}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AccountItem;
