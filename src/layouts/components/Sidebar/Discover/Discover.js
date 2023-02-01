import { faHashtag, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { IconHashTag, IconHashTagMusic } from '../../../../components/Icons';

import styles from './Discover.module.scss';

const cx = classNames.bind(styles);

function Discover() {
    return (
        <div>
            <button className={cx('tag-footer')}>
                <IconHashTag className={cx('hashtag')} />
                <p className={cx('text-hashtag')}>abc</p>
            </button>
            <button className={cx('tag-footer')}>
                <IconHashTagMusic className={cx('hashtag')}/>
                <p className={cx('text-hashtag')}>đi đu đưa đi</p>
            </button>
        </div>
    );
}

export default Discover;
