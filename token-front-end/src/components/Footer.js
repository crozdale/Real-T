import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { Address } from './lib/';
import { footerStyle } from '../styles';
import { features } from '../config';
import '../styles/responsive.css';

import InfiniteCarousel from 'react-leaf-carousel';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column
            className="featured"
            floated="left"
            verticalAlign="middle"
          >
            <Header as="h3"> </Header>
          </Grid.Column>
          <Grid.Column className="Daps" style={footerStyle.noBoxShadow}>
            <Grid.Row verticalAlign="middle" style={footerStyle.features_row}>
              <InfiniteCarousel
                breakpoints={[
                  {
                    breakpoint: 350,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    },
                  },
                ]}
                dots={false}
                showSides={true}
                sidesOpacity={0.5}
                sideSize={0.1}
                slidesToScroll={4}
                slidesToShow={4}
                scrollOnDevice={true}
              >
                {features.map(featured => (
                  <div key={featured.text} style={footerStyle.features_column}>
                    <a
                      target="_blank"
                      title={featured.text}
                      href={`${featured.link}?utm_source=token-front-end`}
                      rel="noopener noreferrer"
                      style={footerStyle.features}
                    >
                      
                    </a>
                  </div>
                ))}
              </InfiniteCarousel>
            </Grid.Row>
          </Grid.Column>
        </Grid>


      </div>
    );
  }
}

Footer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
