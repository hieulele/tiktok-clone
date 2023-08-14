import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchService';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    const searchFocus = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounceValue);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchFocus.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClickSearch = () => {
        setSearchResult([]);
        setSearchValue('');
    };

    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFocus.current.blur();
    };

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves
        //this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} onClick={handleClickSearch} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    {searchResult.length > 0 ? (
                        <Link to={`${config.routes.search}`}>
                            <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </Link>
                    ) : (
                        <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    )}
                    <input
                        ref={searchFocus}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChangeSearch}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
