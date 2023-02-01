import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data, handleSeeAll, handleSeeLess, onViewChange, checkPageUpload, onClick }) {
    const onClickSeeAll = () => {
        handleSeeAll();
    };
    const onClickSeeLess = () => {
        handleSeeLess();
    };
    
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((data, index) => (
                <AccountItem
                    key={index}
                    nickName={data.nickname}
                    userName={data.first_name + data.last_name}
                    imgAccount={data.avatar}
                    tick={data.tick}
                    follow={data.followers_count}
                    like={data.likes_count}
                    checkPageUpload={checkPageUpload}
                    onClick = {onClick}
                />
            ))}
            {(!checkPageUpload ? ( onViewChange ? (
                <p className={cx('more-btn')} onClick={onClickSeeAll}>
                    See all
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={onClickSeeLess}>
                    See less
                </p>
            )) : (
                <></>
            ))}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
