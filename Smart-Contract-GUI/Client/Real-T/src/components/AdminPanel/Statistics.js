import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import GavelIcon from '@material-ui/icons/Gavel';
import StatisticsCard from "./StatisticsCard";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { getStatistics } from "../../api/admin";

export default function Statistics() {
  //stats object
  const [stats, setStats] = React.useState({});
  React.useEffect(() => {
    // fetching stats
    getStatistics().then((res) => setStats(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="TOTAL USERS"
            number={stats?.users || 0}
            iconColor="royalblue"
            icon={<PeopleIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={6} md={6} xl={3} xs={12}>
          <StatisticsCard
            title="Admins"
            number={stats?.admins || 0}
            iconColor="green"
            icon={<VerifiedUserIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="Landlords"
            number={stats?.landlords || 0}
            iconColor="slategray"
            icon={<EmojiTransportationIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="Tenants"
            number={stats?.tenants || 0}
            iconColor="peru"
            icon={<LocalHotelIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="Arbitrators"
            number={stats?.arbitrators || 0}
            iconColor="mediumpurple"
            icon={<GavelIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <StatisticsCard
            title="Promoters"
            number={stats?.promoters || 0}
            iconColor="orange"
            icon={<TrendingUpIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <StatisticsCard
            title="Mail Subscribers"
            number={stats?.subscribers || 0}
            iconColor="lightseagreen"
            icon={<MailOutlineIcon className={classes.icon} />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  iconStyle: {
    height: 56,
    width: 56,
  },
}));
