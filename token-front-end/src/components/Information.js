import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Header } from 'semantic-ui-react';
import '../styles/new-design.css';

export default class Information extends Component {

    render() {
        return (
            <div className='about-section'>
                { this.props.isMobile &&
                    <Divider className='double-bordered single-bottom-bordered'/>
                }
                <Header as='h2' className='about-header'>
                    ABOUT THE PROJECT
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <p>
                            ...
                                </p>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

Information.propTypes = {
    isMobile: PropTypes.bool.isRequired
};
