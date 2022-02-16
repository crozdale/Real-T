pragma solidity >=0.4.21 <0.7.0;

import "./SafeMath.sol";
import "./Ownable.sol";

contract LanlordTenant is Ownable {
	using SafeMath for uint256;

	enum contractStage {unsigned, signed, active, completed}

	string contractClausesHASH;

	address landlord;
	address tenant;
	address arbitror;


	/*
    modifier onlyTenant() {
        require(_tenant == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

	

	function payDeposit() payable onlyTenant() atStage(ContractStage.SignedDepositRequired) {

		//Check the deposit is not being overpaid
		if (depositPaid + msg.value > totalDeposit) {
			throw;
		}
		depositPaid += msg.value;
		DepositPayment(msg.sender, msg.value);
		if (depositPaid == totalDeposit) {
			currentstage = ContractStage.Active;
		}



	}

	function withdrawRent() onlyLandlord() returns (bool) {
		
		var amount = landlordRentToWithdraw;
		if (amount > 0) {
			landlordRentToWithdraw = 0;
			if (!msg.sender.send(amount)) {
				landlordRentToWithdraw = amount;
				RentWithdrawal(msg.sender, amount, false);
				return false;				
			}
			RentWithdrawal(msg.sender, amount, true);
			return true;
		} else {
			throw;
		}

	}

	function payRent(uint256 clientETHGBPInPence) payable onlyTenant() atStage(ContractStage.Active) {
		if (rentPaidInPence >= totalRentAmountInPence) {
			throw;
		}

		var oraclizeQueryPrice = oraclize.getPrice("URL");
		var rentSentInWei = msg.value - oraclizeQueryPrice;

		if (oraclizeQueryPrice >= msg.value) {
			// not enough ETH to cover the query fee
			throw;
		} else {
			byte32 queryID = oraclize_query("URL", "json(URL-ADDRESS-GBPtoETH");
			tenantpayments[queryID] = RentPaymentInfo({
				processed: false,
				sender: msg.sender,
				timestamp: now,
				clientETHGBPInPence: clientETHGBPInPence,
				oracleETHGBPInPence: 0,
				rentPaidInWei: rentSentInWei
				});
		}
	}
*/
	

}
