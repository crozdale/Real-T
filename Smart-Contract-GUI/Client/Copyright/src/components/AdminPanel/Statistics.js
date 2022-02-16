import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import StatisticsCard from "./StatisticsCard";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
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
            title="Writer"
            number={stats?.writers || 0}
            iconColor="slategray"
            icon={<EditTwoToneIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="Readers"
            number={stats?.readers || 0}
            iconColor="peru"
            icon={<LocalLibraryTwoToneIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="Publishers"
            number={stats?.publishers || 0}
            iconColor="mediumpurple"
            icon={<DescriptionTwoToneIcon className={classes.icon} />}
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
