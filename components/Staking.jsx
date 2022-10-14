import { useRouter } from "next/router";
import { memo, useContext, useMemo, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { BigNumber, utils } from "ethers";
import CountUp from "react-countup";
// Components
import Card from "./utils/Card";
import LoadingSpinner from "./utils/LoadingSpinner";
// Constants
import { MAX_APPROVAL, MIM, WINE, MINER } from "../constants";
// Context
import NotificationContext from "../context/NotificationContext";
// Hooks
import useEstimator from "../hooks/useEstimator";
import { useMinerRead } from "../hooks/useMinerRead";
import { useMinerWrite } from "../hooks/useMinerWrite";
import useToken from "../hooks/useToken";
import useWine from "../hooks/useWine";
import useMim from "../hooks/useMim";
// Helpers
import { networkBlockExplorers } from "../helpers/networks";
import usePairPrice from "../hooks/usePairPrice";

const Staking = memo(() => {
  const UserStats = () => {
    const account = useAccount();
    const { userInfo, rewardsPerDay } = useMinerRead();
    const { balance: tokenBalanceOf } = useToken();
    const { balance: wineBalanceOf } = useWine();
    const { balance: mimBalanceOf } = useMim();
    const [balance, setBalance] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [wineBalance, setWineBalance] = useState(0);
    const [mimBalance, setMimBalance] = useState(0);
    const wineMimLPPrice = usePairPrice();
    const [rewardsPerDayBalance, setRewardsPerDayBalance] = useState(0);
    const [dailyAPR, setDailyAPR] = useState(1);

    const clearUserInfo = () => {
      setBalance(0);
      setReferrerRewards(0);
    };

    useEffect(() => {
      if (!tokenBalanceOf) return setTokenBalance(0);
      setTokenBalance(utils.formatEther(tokenBalanceOf?.toString() || "0"));
    }, [tokenBalanceOf]);

    useEffect(() => {
      if (!wineBalanceOf) return setTokenBalance(0);
      setWineBalance(utils.formatEther(wineBalanceOf?.toString() || "0"));
    }, [wineBalanceOf]);

    useEffect(() => {
      if (!mimBalanceOf) return setTokenBalance(0);
      setMimBalance(utils.formatEther(mimBalanceOf?.toString() || "0"));
    }, [mimBalanceOf]);

    useEffect(() => {
      if (userInfo?.isFetching) return;
      if (!userInfo || !account) clearUserInfo();
      setBalance(utils.formatEther(userInfo.data?.trackedTokenBalance || 0));
      setTotalBalance(utils.formatEther(userInfo.data?.totalTokenBalance || 0));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo.length, account]); // .length to prevent infinite loop

    useEffect(() => {
      if (rewardsPerDay) {
        setRewardsPerDayBalance(
          utils.formatEther(rewardsPerDay?.data?.toString() || "0")
        );
      }
    }, [rewardsPerDay]);

    useEffect(() => {
      if (rewardsPerDayBalance != 0 && totalBalance != 0) {
        setDailyAPR(((rewardsPerDayBalance * 100) / totalBalance).toFixed(2));
      }
    }, [rewardsPerDayBalance, totalBalance]);

    return (
      <>
        <div className="flex justify-between text-xl">
          <div>Daily APR</div>
          <div>{dailyAPR}%</div>
        </div>
        <div className="flex justify-between  mt-5">
          <div>Your Compounds</div>
          <div style={{ textAlign: "right" }}>
            <CountUp end={balance - totalBalance} decimals={4} separator="," />{" "}
            LP
            {wineMimLPPrice && (
              <div className="text-xs">
                ~${((balance - totalBalance) * wineMimLPPrice).toFixed(2)}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div>Your Deposits</div>
          <div style={{ textAlign: "right" }}>
            <CountUp end={totalBalance} decimals={4} separator="," /> LP
            {wineMimLPPrice && (
              <div className="text-xs">
                ~${(totalBalance * wineMimLPPrice).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div>Total Compound + Deposits</div>
          <div style={{ textAlign: "right" }}>
            <CountUp end={balance} decimals={4} separator="," /> LP
            {wineMimLPPrice && (
              <div className="text-xs">
                ~${(balance * wineMimLPPrice).toFixed(2)}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>Your sVintage Balance</div>
          <div>
            <CountUp end={tokenBalance} decimals={2} separator="," />
          </div>
        </div>

        {/*<div className="flex justify-between">
          <div>Your Wine Balance</div>
          <div>
            <CountUp end={wineBalance} decimals={2} separator="," />
          </div>
            </div>*/}
        {/*<div className="flex justify-between">
          <div>Your MIM Balance</div>
          <div>
            <CountUp end={mimBalance} decimals={2} separator="," />
          </div>
          </div>*/}
        <div className="flex justify-between">
          <div>sVintage Price</div>
          <div>
            ~$
            <CountUp end={wineMimLPPrice} decimals={4} separator="," />
          </div>
        </div>
      </>
    );
  };

  const DepositForm = memo(({ asset }) => {
    // context
    const { popNotification } = useContext(NotificationContext);
    // hooks
    const account = useAccount();
    const { chain } = useNetwork();
    const {
      balance: tokenBalanceOf,
      minerAllowance: lpTokenMinerAllowance,
      writeApproveAsync: approveToken,
    } = useToken();
    const {
      balance: wineBalanceOf,
      minerAllowance: wineMinerAllowance,
      writeApproveAsync: approveWine,
    } = useWine();
    const {
      balance: mimBalanceOf,
      minerAllowance: mimMinerAllowance,
      writeApproveAsync: approveMim,
    } = useMim();
    const { writeDepositAsync, writeZapAndDepositAsync } = useMinerWrite();
    const router = useRouter();
    const { ref } = router.query;
    // state vars
    const [hasSufficientAllowance, setHasSufficientAllowance] = useState(false);
    const [btnClass, setBtnClass] = useState("app-btn w-full");
    const [depositAmount, setDepositAmount] = useState(0);
    const [depositIsLoading, setDepositIsLoading] = useState(false);
    const [approvalIsLoading, setApprovalIsLoading] = useState(false);

    const depositAmountWei = useMemo(() => {
      if (!depositAmount) return "0";
      return utils.parseEther(depositAmount.toString());
    }, [depositAmount]);
    const handleDepositAmountChanged = (e) => {
      setDepositAmount(e.target.value);
    };

    const accountForSlippage = (amount) => {
      if (!amount) return BigNumber.from(0);
      const slippageAmount = 51;
      const bnAmount = BigNumber.from(amount);
      const bn100 = BigNumber.from(100);
      const slippage = BigNumber.from(slippageAmount);
      return bnAmount.sub(bnAmount.div(bn100).mul(slippage));
    };

    // hook after initialization of depositAmountWei
    const { estimateLPOut } = useEstimator({
      token0,
      token1,
      amount: depositAmountWei,
      enabled: false,
    });
    console.log({ slip: accountForSlippage(estimateLPOut?.data).toString() });
    console.log({ estimateLPOut: estimateLPOut?.data?.toString() });

    const maxDeposit = () => {
      switch (asset) {
        case "wine":
          return setDepositAmount(utils.formatEther(wineBalanceOf?.toString()));
        case "mim":
          return setDepositAmount(utils.formatEther(mimBalanceOf?.toString()));
        default:
          return setDepositAmount(
            utils.formatEther(tokenBalanceOf?.toString())
          );
      }
    };

    useEffect(() => {
      const className = "app-btn w-full";
      if (!account) className += " btn-disabled";
      setBtnClass(className);
    }, [account, hasSufficientAllowance]);

    useEffect(() => {
      console.log({ lpTokenMinerAllowance });
      if (asset !== "lp") return;
      if (!lpTokenMinerAllowance) return setHasSufficientAllowance(false);
      const bnMinerAllowance = BigNumber.from(lpTokenMinerAllowance);
      if (bnMinerAllowance.eq(0)) return setHasSufficientAllowance(false);
      const bnDepositAmount = BigNumber.from(depositAmountWei);
      setHasSufficientAllowance(bnMinerAllowance.gte(bnDepositAmount));
    }, [asset, lpTokenMinerAllowance]);

    useEffect(() => {
      console.log({ wineMinerAllowance });
      if (asset !== "wine") return;
      if (!wineMinerAllowance) return setHasSufficientAllowance(false);
      const bnMinerAllowance = BigNumber.from(wineMinerAllowance);
      if (bnMinerAllowance.eq(0)) return setHasSufficientAllowance(false);
      const bnDepositAmount = BigNumber.from(depositAmountWei);
      setHasSufficientAllowance(bnMinerAllowance.gte(bnDepositAmount));
    }, [asset, wineMinerAllowance]);

    useEffect(() => {
      console.log({ mimMinerAllowance });
      if (asset !== "mim") return;
      if (!mimMinerAllowance) return setHasSufficientAllowance(false);
      const bnMinerAllowance = BigNumber.from(mimMinerAllowance);
      if (bnMinerAllowance.eq(0)) return setHasSufficientAllowance(false);
      const bnDepositAmount = BigNumber.from(depositAmountWei);
      setHasSufficientAllowance(bnMinerAllowance.gte(bnDepositAmount));
    }, [asset, mimMinerAllowance]);

    const approve = async () => {
      setApprovalIsLoading(true);
      const approval = {
        wine: approveWine,
        mim: approveMim,
        lp: approveToken,
      };
      try {
        const req = await approval[asset]({
          args: [MINER[chain?.id]?.address, MAX_APPROVAL],
        });
        popNotification({
          type: "success",
          title: "Approval Submitted",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
        });
        const tx = await req.wait();
        popNotification({
          type: "success",
          title: "Approval Complete",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${
            tx.transactionHash
          }`,
        });
        setHasSufficientAllowance(true);
      } catch (e) {
        popNotification({
          type: "error",
          title: "Approval Error",
          description: e.toString(),
        });
      }

      setApprovalIsLoading(false);
    };

    const deposit = async () => {
      if (depositIsLoading) return;
      setDepositIsLoading(true);
      const depositFunction = {
        wine: writeZapAndDepositAsync,
        mim: writeZapAndDepositAsync,
        lp: writeDepositAsync,
      };

      const depositArgs = {
        wine: [
          ref ?? account?.address,
          WINE[chain?.id]?.address,
          depositAmountWei,
          0,
        ],
        mim: [
          ref ?? account?.address,
          MIM[chain?.id]?.address,
          depositAmountWei,
          0,
        ],
        lp: [ref ?? account?.address, depositAmountWei],
      };
      try {
        const req = await depositFunction[asset]({
          args: depositArgs[asset],
        });
        popNotification({
          type: "success",
          title: "Deposit Submitted",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
        });
        const tx = await req.wait();
        popNotification({
          type: "success",
          title: "Deposit Complete",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${
            tx.transactionHash
          }`,
        });
      } catch (e) {
        popNotification({
          type: "error",
          title: "Deposit Error",
          description: e.toString(),
        });
      }
      setDepositIsLoading(false);
      setDepositAmount(0);
    };

    DepositForm.displayName = "DespoitForm";
    return (
      <>
        <div className="grid grid-flow-col gap-2">
          {!hasSufficientAllowance ? (
            <button className={`${btnClass} mt-5`} onClick={() => approve()}>
              {approvalIsLoading ? (
                <LoadingSpinner text="Approving" />
              ) : (
                `Approve`
              )}
            </button>
          ) : (
            <>
              <div className="relative rounded-md shadow-sm  mt-5">
                <input
                  type="text"
                  name="deposit"
                  id="deposit"
                  value={depositAmount}
                  onChange={handleDepositAmountChanged}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-20 sm:text-sm text-right text-slate-500 border-gray-300 rounded-md"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={() => maxDeposit()}
                    className="text-brand-1 mr-5 p-1 text-sm"
                  >
                    Max
                  </button>
                </div>
              </div>
              <button className={btnClass + "  mt-5"} onClick={() => deposit()}>
                {depositIsLoading ? (
                  <LoadingSpinner text="Depositing" />
                ) : (
                  <span>Deposit</span>
                )}
              </button>
            </>
          )}
        </div>
      
      </>
    );
  });

  const { chain } = useNetwork();
  const [asset, setAsset] = useState("lp");
  // estimate Lp tokens out if needed
  const [token0, setToken0] = useState(WINE[chain?.id]?.address);
  const [token1, setToken1] = useState(MIM[chain?.id]?.address);

  const handleAssetChanged = (e) => {
    const a = e.target.value;
    setAsset(a);
    if (a === "wine") {
      setToken0(WINE[chain?.id]?.address);
      setToken1(MIM[chain?.id]?.address);
    } else {
      setToken0(MIM[chain?.id]?.address);
      setToken1(WINE[chain?.id]?.address);
    }
  };

  return (
    <Card title="Staking" image="grape-soda.png">
      <UserStats />
      <div
        className="flex justify-center items-center mr-4 mt-5 mb-1"
        onChange={(e) => handleAssetChanged(e)}
      >
        <input
          id="lp"
          checked={asset === "lp"}
          value="lp"
          type="radio"
          name="asset"
          className="form-radio rounded text-brand-1 mr-1"
          readOnly
        />
        <label htmlFor="lp" className="flex items-center cursor-pointer mr-5">
        sVintage Tokens
        </label>
        {/* <input
          id="wine"
          checked={asset === "wine"}
          value="wine"
          type="radio"
          name="asset"
          className="form-radio rounded text-brand-1 mr-1"
          readOnly
        />
        <label htmlFor="wine" className="flex items-center cursor-pointer mr-5">
          Wine
        </label>*/}
        <input
          id="mim"
          checked={asset === "mim"}
          value="mim"
          type="radio"
          name="asset"
          className="form-radio rounded text-brand-1 mr-1"
          readOnly
        />
        <label htmlFor="mim" className="flex items-center cursor-pointer mr-5">
          MIM
        </label>
      </div>
      <DepositForm asset={asset} />
    </Card>
  );
});

Staking.displayName = "Staking";
export default Staking;
