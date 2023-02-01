import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Profile.module.scss';
import * as contentService from '~/services/contentService';
import ContentItem from './ContentItem';
import videos from '~/assets/videos';

const cx = classNames.bind(styles);

function Profile() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        contentService
            .getContent({ perPage: 5 })
            .then((data) => {
                setContent(data);
            })
            .catch((error) => console.log(error));
    },[]);
    return (
        <div className={cx('wrapper')}>
            {content.map((data, index) => (
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

export default Profile;