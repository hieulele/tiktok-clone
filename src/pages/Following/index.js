import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Following.module.scss';
import * as followingService from '~/services/followingService';
import ContentItem from './ContentItem';
import videos from '~/assets/videos';

const cx = classNames.bind(styles);

function Following() {
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
        <div className={cx('wrapper')}>
            {following.map((data, index) => (
                <ContentItem
                    key={index}
                    index={index}
                    nickName={data.nickname}
                    userName={data.first_name + data.last_name}
                    imgAccount={data.avatar}
                    tick={data.tick}
                    description={data.popular_video.description}
                    follow={data.followers_count}
                    like={data.likes_count}
                    comment={data.popular_video.comments_count}
                    share={data.popular_video.shares_count}
                    video={videos[index]}
                />
            ))}
        </div>
    );
}

export default Following;