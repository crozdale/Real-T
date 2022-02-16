import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar, makeStyles } from '@material-ui/core';

const StatisticsCard = ({ title, number, icon, iconColor, extended=false }) => {

    const cardClasses = cardStyles();

    return ( 
        <Card className={cardClasses.root}>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    className={cardClasses.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {title}
                  </Typography>
                  <Typography color="inherit" variant="h3">
                    {number}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={cardClasses.iconStyle} style={{backgroundColor: iconColor}}>
                    {icon}
                  </Avatar>
                </Grid>
              </Grid>
              {extended && <div className={cardClasses.difference}>
                <Typography
                  className={cardClasses.differenceValue}
                  variant="body2"
                >
                  {extended.first}
                </Typography>
                <Typography
                  className={cardClasses.usersValue}
                  variant="caption"
                >
                  {extended.second}
                </Typography>
              </div>}
            </CardContent>
          </Card>
     );
}
 
export default StatisticsCard;

const cardStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    content: {
      alignItems: "center",
      display: "flex",
    },
    title: {
      fontWeight: 700,
    },
    avatar: {
      backgroundColor: theme.palette.success.main,
      height: 56,
      width: 56,
    },
    icon: {
      height: 32,
      width: 32,
    },
    difference: {
      marginTop: theme.spacing(2),
      display: "flex",
      alignItems: "center",
    },
    differenceIcon: {
      color: theme.palette.success.dark,
    },
    differenceValue: {
      color: theme.palette.success.dark,
      marginRight: theme.spacing(1),
    },
    usersValue: as => ({
      color: theme.palette.primary.dark,
      marginRight: theme.spacing(1),
    }),
    iconStyle: {
      height: 56,
      width: 56,
    }
  }));