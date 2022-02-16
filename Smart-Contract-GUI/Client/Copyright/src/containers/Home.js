import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import styles from './Register.module.css';
import { checkAuth } from '../api/user';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        copyright
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));


export default function Home(props) {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(false)
  const roles = [
    {
      title: 'Writer',
      description: ['Issue writings', 'Receive payment', 'Manage agreements'],
      buttonText: 'Get started',
      buttonVariant: 'contained',
      onClick: () => props.history.push({
        pathname: '/copyright/login',
        state: {role: 'writer'}
      })
    },
    {
      title: 'Reader',
      // subheader: 'test',
      description: [
        'Buy writings',
        'Pay periodic payments',
        'Report issues',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
      onClick: () => props.history.push({
        pathname: '/copyright/login',
        state: {role: 'reader'}
      })
    },
    {
      title: 'Publisher',
      description: [
        'Receive issues',
        'Oversee agreements',
        'Arbitrate deposit deduction'
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
      onClick: () => props.history.push({
        pathname: '/copyright/login',
        state: {role: 'publisher'}
      })
    },
    {
      title: 'Promoter',
      description: [
        '‎\n',
        'Promote copyright',
        '‎\n'
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
      onClick: () => props.history.push({
        pathname: '/copyright/login',
        state: {role: 'promoter'}
      })
    },
  ];

  React.useEffect(() => {
    checkAuth().then(()=> setLoggedIn(true)).catch(e => console.log(e));
  },[])

  if (loggedIn) props.history.push('/copyright/writings');
  return (
    <section className={styles.section}>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="m" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Welcome to copyright
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p" style={{maxWidth: "80%"}}>
          copyright is a web application that implements Blockchain technology in the field of selling writings.
          Writers are able to sell and publish their writings, Readers are able to buy these writings,
           And promoters can promote them.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} justify='center'>
          {roles.map((role) => (
            <Grid item key={role.title} xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title={
                    <Typography component="h5" align='center' variant="h3" color="textPrimary">
                      {role.title}
                    </Typography>
                  }
                  // subheader={role.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {role.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={role.buttonVariant} color="primary" onClick={role.onClick}>
                    {role.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer">
        <Box mt={5} className='pt-5'>
          <Copyright className='mt-5 pt-5'/>
        </Box>
      </Container>
      {/* End footer */}
    </section>
  );
}