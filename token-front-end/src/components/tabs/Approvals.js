import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { Card, Checkbox, Divider, Grid, Form, Button } from 'semantic-ui-react';
import Web3Service from '../../services/web3Service';
import {
  prettyNumber,
  totalAmount,
  updateArray,
  validateAmount,
  validateAmounts,
} from '../../services/utils';
import { contentStyle } from '../../styles';

const MINIMUM_APPROVAL = 0;

export default class Approvals extends Component {
  constructor(props) {
    super(props);
    this.props.setTransferDetailsFetcher(this.fetchApproveDetails.bind(this));
    this.props.setResetDetails(this.resetDetails.bind(this));

    this.onChange = this.onChange.bind(this);
    this.setMaxValue = this.setMaxValue.bind(this);
    this.toggleBatch = this.toggleBatch.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.removeFromArray = this.removeFromArray.bind(this);
    this.updateAllowance = this.updateAllowance.bind(this);
    this.updateAllAllowances = this.updateAllAllowances.bind(this);
    this.isValidRecipientAmountSet = this.isValidRecipientAmountSet.bind(this);
  }

  state = {
    isBatch: false,
    recipientAddress: '',
    recipientAmount: '',
    recipientAllowance: '',
    recipientAddresses: [],
    recipientAmounts: [],
    recipientAllowances: [],
  };

  get totalAmount() {
    const amounts = []
      .concat(this.state.recipientAmounts)
      .concat([this.state.recipientAmount]);
    const total = totalAmount(
      0,
      amounts.map(amount =>
        this.props.parseTokenAmount(amount || 0, false).toFixed()
      )
    );
    return total.valueOf();
  }

  async updateAllowance(index) {
    const { isValidAddress, tokenAddress } = this.props;
    const address =
      typeof index === 'undefined'
        ? this.state.recipientAddress
        : this.state.recipientAddresses[index];
    let allowance = 0;
    if (isValidAddress(tokenAddress) && isValidAddress(address)) {
      allowance = await Web3Service.getTokenAllowance(tokenAddress, address);
    }
    if (typeof index === 'undefined') {
      this.setState({
        recipientAllowance: allowance,
      });
    } else {
      const allowances = this.state.recipientAllowances;
      allowances[index] = allowance;
      this.setState({
        recipientAllowances: allowances,
      });
    }
  }

  async updateAllAllowances() {
    const indexes = new Array(this.state.recipientAmounts.length)
      .fill('')
      .map((v, index) => index);
    indexes.unshift(undefined);
    await Promise.all(indexes.map(index => this.updateAllowance(index)));
  }

  isValidRecipientAmountSet(index) {
    let isValid = true;
    const value =
      typeof index === 'undefined'
        ? this.state.recipientAmount
        : this.state.recipientAmounts[index];

    if (validateAmount(value, MINIMUM_APPROVAL)) {
      let total = new BigNumber(0);
      if (typeof index === 'undefined') {
        index = this.state.recipientAmounts.length;
      }
      this.state.recipientAmounts.map((amount, ind) =>
        ind < index
          ? (total = total.plus(
              this.props.parseTokenAmount(amount || 0, false)
            ))
          : null
      );
      total = total.plus(this.props.parseTokenAmount(value || 0, false));
      isValid = total.gte(new BigNumber(MINIMUM_APPROVAL));
    } else {
      isValid = false;
    }
    return isValid;
  }

  toggleBatch() {
    if (this.state.isBatch) {
      const address =
        this.state.recipientAddresses[0] || this.state.recipientAddress;
      const amount =
        this.state.recipientAmounts[0] || this.state.recipientAmount;
      const balance =
        this.state.recipientAllowances[0] || this.state.recipientAllowance;
      this.setState({
        isBatch: !this.state.isBatch,
        recipientAddress: address,
        recipientAmount: amount,
        recipientAllowance: balance,
        recipientAddresses: [],
        recipientAmounts: [],
        recipientAllowances: [],
      });
    } else {
      this.setState({ isBatch: !this.state.isBatch });
      this.addToArray();
    }
  }

  addToArray() {
    if (
      !this.state.recipientAddress ||
      (this.state.recipientAddresses.length > 0 &&
        this.state.recipientAddresses.includes(this.state.recipientAddress))
    ) {
      return false;
    }
    const addresses = [].concat(this.state.recipientAddresses);
    const amounts = [].concat(this.state.recipientAmounts);
    const allowances = [].concat(this.state.recipientAllowances);
    addresses.push(this.state.recipientAddress);
    amounts.push(this.state.recipientAmount);
    allowances.push(this.state.recipientAllowance);

    this.setState({
      recipientAddresses: addresses,
      recipientAllowances: allowances,
      recipientAmounts: amounts,
      recipientAddress: '',
      recipientAllowance: '',
      recipientAmount: '',
    });
  }

  validateAddresses() {
    let isValid = true;
    if (this.state.recipientAddresses.length > 0) {
      this.state.recipientAddresses.map(address => {
        if (!this.props.isValidAddress(address)) {
          isValid = false;
        }
      });
    }
    if (
      (this.state.recipientAddress ||
        this.state.recipientAmount ||
        (this.state.recipientAddresses.length === 0 &&
          !this.state.recipientAddress)) &&
      !this.props.isValidAddress(this.state.recipientAddress)
    ) {
      isValid = false;
    }
    this.props.setValidRecipientAddressesSet(isValid);
  }

  validateAmounts() {
    let isValid = true;
    isValid = validateAmounts(
      [].concat(this.state.recipientAmounts),
      MINIMUM_APPROVAL
    );
    if (this.state.recipientAmount || this.state.recipientAddress) {
      isValid = validateAmount(this.state.recipientAmount, MINIMUM_APPROVAL)
        ? isValid
        : false;
    }
    this.props.setValidRecipientAmountsSet(isValid);
  }

  validateForm() {
    this.validateAddresses();
    this.validateAmounts();
  }


  resetDetails() {
    this.setState({
      recipientAddress: '',
      recipientAmount: '',
      recipientAllowance: '',
      recipientAddresses: [],
      recipientAmounts: [],
      recipientAllowances: [],
    });
  }

  fetchApproveDetails() {
    if (
      this.state.recipientAddresses.length !==
      this.state.recipientAmounts.length
    ) {
      return false;
    }
    const addresses = [].concat(this.state.recipientAddresses);
    const amounts = [].concat(this.state.recipientAmounts);
    if (this.props.isValidAddress(this.state.recipientAddress)) {
      addresses.push(this.state.recipientAddress);
      amounts.push(this.state.recipientAmount);
    }
    return {
      addresses,
      amounts,
    };
  }

  removeFromArray = index => () => {
    const addresses = [].concat(this.state.recipientAddresses);
    const amounts = [].concat(this.state.recipientAmounts);
    const allowances = [].concat(this.state.recipientAllowances);
    addresses.splice(index, 1);
    amounts.splice(index, 1);
    allowances.splice(index, 1);

    this.setState({
      recipientAddresses: addresses,
      recipientAllowances: allowances,
      recipientAmounts: amounts,
    });
  };

  setMaxValue = () => {
    const value = new BigNumber(this.props.balance);
    this.setState(
      {
        recipientAmount: this.props.parseTokenAmount(value).toFixed(),
      },
      () => {
        this.props.updateTotalAmount(
          this.props.parseTokenAmount(this.totalAmount).toFixed()
        );
        this.validateForm();
      }
    );
  };

  onChange = (property, index) => event => {
    const { target } = event;
    if (typeof index === 'undefined') {
      this.setState({ [property]: target.value }, () => {
        this.validateForm();
      });
    } else {
      this.setState(
        {
          [property]: updateArray(this.state[property], index, target.value),
        },
        () => {
          this.validateForm();
        }
      );
    }
    const amountFields = ['recipientAmount', 'recipientAmounts'];
    if (amountFields.includes(property)) {
      this.props.updateTotalAmount(
        this.props.parseTokenAmount(this.totalAmount).toFixed()
      );
    }
    const addressFields = ['recipientAddress', 'recipientAddresses'];
    if (addressFields.includes(property)) {
      this.updateAllowance(index);
    }
  };

  componentDidMount = () => {
    this.props.updateTotalAmount('0');
    this.props.setUpdatedAccountActions([
      this.updateAllAllowances,
      this.validateForm,
    ]);
  };

  render() {
    const balanceButtonProps = {};

    const addAddressButtonProps = {};

    if (this.props.isMobile) {
      balanceButtonProps.floated = 'left';
      addAddressButtonProps.floated = 'right';
    }
    return (
      <Form>
        <div>
          <Grid style={contentStyle.main}>
            <Grid.Column width={16}>
              <div className="mb-0">
                {this.props.isMobile && (
                  <Grid className="mb-24">
                    <Grid.Row>
                      <Grid.Column>
                        <Divider className=" single-bordered single-bottom-bordered" />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Checkbox
                          toggle
                          label="Multiple Approvals"
                          checked={this.state.isBatch}
                          onChange={this.toggleBatch}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                )}
                <div>
                  {this.state.recipientAddresses.map((address, index) => (
                    <Card
                      fluid
                      className={`board ${
                        !this.props.isMobile ? 'mb-60' : 'mb-0'
                      }`}
                      key={index}
                    >
                      <Grid
                        className={`${
                          !this.props.isMobile ? 'mt-24 mb-24' : 'mt-0 mb-0'
                        }`}
                      >
                        <Grid.Row columns={this.props.isMobile ? 1 : 3}>
                          {!this.props.isMobile && (
                            <Grid.Column width={2}></Grid.Column>
                          )}
                          <Grid.Column width={this.props.isMobile ? 16 : 12}>
                            <Form.Field
                              error={
                                Boolean(address) &&
                                !this.props.isValidAddress(address)
                              }
                            >
                              <Form.Input
                                placeholder="Address"
                                value={this.state.recipientAddresses[index]}
                                onChange={this.onChange(
                                  'recipientAddresses',
                                  index
                                )}
                                onKeyUp={this.onChange(
                                  'recipientAddresses',
                                  index
                                )}
                                onBlur={this.onChange(
                                  'recipientAddresses',
                                  index
                                )}
                                className="curved-border mb-12"
                              />
                            </Form.Field>
                            <Form.Field
                              className="allowances"
                              error={
                                Boolean(this.state.recipientAmounts[index]) &&
                                !this.isValidRecipientAmountSet(index)
                              }
                            >
                              <Form.Input
                                placeholder={`${this.props.symbol}s to approve`}
                                value={this.state.recipientAmounts[index]}
                                onChange={this.onChange(
                                  'recipientAmounts',
                                  index
                                )}
                                onKeyUp={this.onChange(
                                  'recipientAmounts',
                                  index
                                )}
                                onBlur={this.onChange(
                                  'recipientAmounts',
                                  index
                                )}
                                className="curved-border mb-12"
                              />
                              <h5 className="address mt-0">
                                <span className="mr-12" title="Allocation">
                                  Allocation:{' '}
                                </span>
                                <span>
                                  {this.state.recipientAllowances[index]
                                    ? prettyNumber(
                                        this.props
                                          .parseTokenAmount(
                                            this.state.recipientAllowances[
                                              index
                                            ]
                                          )
                                          .toFixed()
                                      )
                                    : 0}
                                </span>
                              </h5>
                            </Form.Field>
                            <Button
                              icon
                              floated="right"
                              color="red"
                              className="delete-button curved-border"
                              onClick={this.removeFromArray(index)}
                              title="Remove address"
                            >
                              {/* <Icon name='delete' style={contentStyle.iconButton}  /> */}
                              REMOVE
                            </Button>
                          </Grid.Column>
                          {!this.props.isMobile && (
                            <Grid.Column width={2}></Grid.Column>
                          )}
                        </Grid.Row>
                      </Grid>
                      {this.props.isMobile && <Divider className="mb-0 mt-0" />}
                    </Card>
                  ))}
                  <Card
                    fluid
                    className={`board ${
                      !this.props.isMobile ? 'mb-60' : 'mb-0'
                    }`}
                  >
                    <Grid
                      columns={this.props.isMobile ? 1 : 3}
                      className={`${
                        !this.props.isMobile ? 'mt-24 mb-24' : 'mt-0 mb-0'
                      }`}
                    >
                      {!this.props.isMobile && (
                        <Grid.Column width={2}></Grid.Column>
                      )}
                      <Grid.Column width={this.props.isMobile ? 16 : 12}>
                        <Form.Field
                          error={
                            Boolean(this.state.recipientAddress) &&
                            !this.props.isValidAddress(
                              this.state.recipientAddress
                            )
                          }
                        >
                          <Form.Input
                            placeholder="Address"
                            value={this.state.recipientAddress}
                            onChange={this.onChange('recipientAddress')}
                            onKeyUp={this.onChange('recipientAddress')}
                            onBlur={this.onChange('recipientAddress')}
                            className="curved-border"
                          />
                        </Form.Field>
                        <Form.Field
                          className=" mb-12 allowances"
                          error={
                            Boolean(this.state.recipientAmount) &&
                            !this.isValidRecipientAmountSet()
                          }
                        >
                          <Form.Input
                            placeholder={`${this.props.symbol}s to approve`}
                            value={this.state.recipientAmount}
                            onChange={this.onChange('recipientAmount')}
                            onKeyUp={this.onChange('recipientAmount')}
                            onBlur={this.onChange('recipientAmount')}
                            className="curved-border"
                          />
                          <h5 className="address mt-0">
                            <span className="mr-12" title="Allocation">
                              Allocation:{' '}
                            </span>
                            <span>
                              {this.state.recipientAllowance
                                ? prettyNumber(
                                    this.props
                                      .parseTokenAmount(
                                        this.state.recipientAllowance
                                      )
                                      .toFixed()
                                  )
                                : 0}
                            </span>
                          </h5>
                        </Form.Field>
                      </Grid.Column>
                      {!this.props.isMobile && (
                        <Grid.Column width={2}></Grid.Column>
                      )}
                    </Grid>
                  </Card>
                </div>
              </div>
              <div
                className="btn-wrapper2"
                style={this.props.isMobile ? {} : { paddingBottom: '100px' }}
              >
                <Grid>
                  {!this.props.isMobile && (
                    <Grid.Column width={4}>
                      <Checkbox
                        toggle
                        label="Multiple Approvals"
                        checked={this.state.isBatch}
                        onChange={this.toggleBatch}
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column
                    width={this.props.isMobile ? 16 : 12}
                    textAlign="right"
                  >
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={this.props.isMobile ? 10 : 12}>
                          <Button
                            title="Send remaining Allowance"
                            className="ash curved-border mr-12"
                            onClick={this.setMaxValue}
                            {...balanceButtonProps}
                          >
                            Approve Balance
                          </Button>
                          <Button
                            title="Add new address"
                            className="ash curved-border"
                            disabled={!this.state.isBatch}
                            onClick={this.addToArray}
                            {...addAddressButtonProps}
                          >
                            Add new address
                          </Button>
                        </Grid.Column>
                        <Grid.Column
                          width={this.props.isMobile ? 6 : 4}
                          textAlign="right"
                        >
                          <Button
                            onClick={this.props.approveTokens}
                            disabled={
                              this.props.approvingTokens || !this.props.canSend
                            }
                            loading={this.props.approvingTokens}
                            className="approve curved-border"
                          >
                            Approve{' '}
                            {Boolean(
                              Number(this.props.totalRecipientsAmounts)
                            ) &&
                              `${prettyNumber(
                                this.props.totalRecipientsAmounts
                              )} ${this.props.symbol}(s)`}
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Form>
    );
  }
}

Approvals.propTypes = {
  tokenAddress: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.func.isRequired,
  parseTokenAmount: PropTypes.func.isRequired,
  updateTotalAmount: PropTypes.func.isRequired,
  setResetDetails: PropTypes.func.isRequired,
  setTransferDetailsFetcher: PropTypes.func.isRequired,
  setUpdatedAccountActions: PropTypes.func.isRequired,
  setValidRecipientAddressesSet: PropTypes.func.isRequired,
  setValidRecipientAmountsSet: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  canSend: PropTypes.bool.isRequired,
  approvingTokens: PropTypes.bool.isRequired,
  approveTokens: PropTypes.func.isRequired,
  totalRecipientsAmounts: PropTypes.string.isRequired,
};

