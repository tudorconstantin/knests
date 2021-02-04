import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CustomTheme from '~theme';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'obligatoriu' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'obligatoriu' },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme: typeof CustomTheme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.common.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
  },
  bio: {
    color: theme.palette.common.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SIGNUP = gql`
  mutation signup($credentials: UserSignupInput) {
    signup(user: $credentials) {
      email
      status
      roles
      createdAt
      updatedAt
    }
  }
`;
const SignUp = (props) => {
  const { history } = props;

  const classes = useStyles(props.theme);

  interface iFormState {
    isValid: Boolean;
    values: any;
    touched: Object;
    errors: Object;
  }

  const typedFormState: iFormState = {
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  };

  const router = useRouter();
  const [doSignup, { data, loading, error }] = useMutation(SIGNUP);
  if (data && !error) {
    router.push('/login');
  }

  const [formState, setFormState] = useState(typedFormState);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const { repeatPassword, ...credentials } = formState.values;
    doSignup({
      variables: {
        credentials,
      },
    });
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.content}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography
                  className={classes.title}
                  variant="h2"
                  align="center"
                >
                  Sign up
                </Typography>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                > Or log in with
                  <Link href="/login">
                    <a> email</a>
                  </Link>
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    ''
                    // hasError("email") ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    ''
                    // hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('repeatPassword')}
                  fullWidth
                  helperText={
                    ''
                    // hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Repeat password"
                  name="repeatPassword"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.repeatPassword || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up!
                </Button>
                {/* <Typography color="textSecondary" variant="body1">
                  Don't have an account?{" "}
                  <Link href="/signup" >
                    Sign up
                  </Link>
                </Typography> */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default SignUp;
