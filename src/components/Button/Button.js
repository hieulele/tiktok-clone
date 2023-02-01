import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    color,
    upload = false,
    primary = false,
    outline = false,
    text = false,
    disable = false,
    rounder = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const classes = cx('wrapper', {
        upload,
        color,
        primary,
        outline,
        text,
        disable,
        rounder,
        small,
        large,
        [className]: className,
    });

    const props = {
        onClick,
        ...passProps,
    };

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', color)}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to : PropTypes.string,
    href : PropTypes.string,
    upload : PropTypes.bool,
    primary : PropTypes.bool,
    outline : PropTypes.bool,
    text : PropTypes.bool,
    disable : PropTypes.bool,
    rounder : PropTypes.bool,
    small : PropTypes.bool,
    large : PropTypes.bool,
    children : PropTypes.node.isRequired,
    className : PropTypes.string,
    leftIcon : PropTypes.node,
    rightIcon : PropTypes.node,
    onClick : PropTypes.func
};

export default Button;
