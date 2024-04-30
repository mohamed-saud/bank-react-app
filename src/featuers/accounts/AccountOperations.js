import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw } from "./AccountSlice";
import { requestLoan } from "./AccountSlice";
import { requestPayLoan } from "./AccountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();

  const { balance, loan, isLoading, purposeLoan } = useSelector(
    (store) => store.account
  );
  function handleDeposit() {
    if (depositAmount === "") return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (withdrawalAmount === "") return;
    if (balance < withdrawalAmount) return alert("cant withdaw the amount");
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (loanAmount === "" || loanPurpose === "") return;
    dispatch(requestLoan({ amount: loanAmount, purpose: loanPurpose }));
    setLoanAmount("");
    setLoanPurpose("");
  }
  function handlePayLoan() {
    dispatch(requestPayLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button disabled={isLoading} onClick={handleDeposit}>
            {isLoading ? "Convirting" : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button
            onClick={(e) => {
              handleWithdrawal(e);
            }}
          >
            Withdraw {withdrawalAmount}
          </button>
        </div>

        {loan <= 0 && (
          <div>
            <label>Request loan</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(+e.target.value)}
              placeholder="Loan amount"
            />
            <input
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              placeholder="Loan purpose"
            />
            <button onClick={handleRequestLoan}>Request loan</button>
          </div>
        )}
        {loan > 0 && (
          <div>
            <span>
              Pay back {currency} {loan} to {purposeLoan}
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
