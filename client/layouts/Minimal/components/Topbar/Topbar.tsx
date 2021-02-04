import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <Link href="/">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
