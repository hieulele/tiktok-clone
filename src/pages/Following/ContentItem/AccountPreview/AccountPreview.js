import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

function AccountPreview({imgAccount, nickName, userName, tick, follow, like}) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <img
                    className={cx('avatar-tippy')}
                    src={imgAccount}
                    alt="imageAccount"
                />
                <Button className={cx('buttonTippy')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('item-infoTippy')}>
                <p className={cx('nicknameTippy')}>
                    <strong>{nickName}</strong>
                    {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('nameTippy')}>{userName}</p>
            </div>
            <span className={cx('interactAccount')}>
                <strong className={cx('item-interact')}>{follow}</strong>
                Followers
                <strong className={cx('item-interact')}>{like}</strong>
                Likes
            </span>
        </div>
    );
}

export default AccountPreview;
