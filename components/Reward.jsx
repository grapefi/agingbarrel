import { memo, useContext, useMemo, useEffect, useState } from "react";
import CountUp from "react-countup";
import { utils } from "ethers";
// Components
import Card from "./utils/Card";
import LoadingSpinner from "./utils/LoadingSpinner";
// Context
import NotificationContext from "../context/NotificationContext";
// Hooks
import { useNetwork, useBlockNumber } from "wagmi";
import useMinerRead from "../hooks/useMinerRead";
import useMinerWrite from "../hooks/useMinerWrite";
import usePrevious from "../hooks/usePrevious";

// Helpers
import { networkBlockExplorers } from "../helpers/networks";
import usePairPrice from "../hooks/usePairPrice";

const Rewards = memo(() => {
  // context
  const { popNotification } = useContext(NotificationContext);
  // hooks
  const { chain } = useNetwork();
  const { writeClaimAsync, writeCompoundAsync } = useMinerWrite();
  const { claimFee, pendingRewards, rewardsPerDay } = useMinerRead();
  // state
  const [claimBalance, setClaimBalance] = useState(0);
  const [rewardsPerDayBalance, setRewardsPerDayBalance] = useState(0);
  const prevClaimBalance = usePrevious(claimBalance);
  const [claimIsLoading, setClaimIsLoading] = useState(false);
  const [compoundIsLoading, setCompoundIsLoading] = useState(false);
  const wineMimLPPrice = usePairPrice();

  const claimFeeFormatted = useMemo(() => {
    if (!claimFee) return "...";
    const denominator = 10;
    return Number(claimFee?.data?.toString()) / denominator;
  }, [claimFee]);

  useEffect(() => {
    if (pendingRewards?.isFetching) return;
    const newClaimBalance = utils.formatEther(
      pendingRewards?.data?.toString() || "0"
    );
    if (newClaimBalance !== claimBalance) {
      setClaimBalance(newClaimBalance);
    }
  }, [pendingRewards]);

  useEffect(() => {
    if (rewardsPerDay?.isFetching) return;
    const newRewardsPerDay = utils.formatEther(
      rewardsPerDay?.data?.toString() || "0"
    );
    if (newRewardsPerDay !== claimBalance) {
      setRewardsPerDayBalance(newRewardsPerDay);
    }
  }, [rewardsPerDay]);

  const claim = async () => {
    if (claimIsLoading) return;
    setClaimIsLoading(true);
    try {
      const req = await writeClaimAsync();
      popNotification({
        type: "success",
        title: "Claim Submitted",
        description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
        link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
      });
      const tx = await req.wait();
      popNotification({
        type: "success",
        title: "Claim Complete",
        description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
        link: `${networkBlockExplorers[chain?.id]?.url}/tx/${
          tx.transactionHash
        }`,
      });
    } catch (e) {
      popNotification({
        type: "error",
        title: "Claim Error",
        description: e.toString(),
      });
    }
    setClaimIsLoading(false);
  };

  const compound = async () => {
    if (compoundIsLoading) return;
    setCompoundIsLoading(true);
    try {
      const req = await writeCompoundAsync();
      popNotification({
        type: "success",
        title: "Compound Submitted",
        description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
        link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
      });
      const tx = await req.wait();
      popNotification({
        type: "success",
        title: "Compund Complete",
        description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
        link: `${networkBlockExplorers[chain?.id]?.url}/tx/${
          tx.transactionHash
        }`,
      });
    } catch (e) {
      popNotification({
        type: "error",
        title: "Compound Error",
        description: e.toString(),
      });
    }
    setCompoundIsLoading(false);
  };

  return (
    <div className="rewards-box">
      <Card title="Your Rewards" image="rewards.png">
        <div className="flex justify-between text-xl">
          <div>Pending</div>
          <div style={{ textAlign: "right" }}>
            <CountUp
              start={prevClaimBalance}
              end={claimBalance}
              decimals={5}
              separator=","
            />
            &nbsp;LP Tokens
            {wineMimLPPrice && (
              <div className="text-xs">
                ~${(claimBalance * wineMimLPPrice).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between text-xl">
          <div>Daily</div>
          <div style={{ textAlign: "right" }}>
            <CountUp
              start={0}
              end={rewardsPerDayBalance}
              decimals={5}
              separator=","
            />
            &nbsp;LP Tokens
            {wineMimLPPrice && (
              <div className="text-xs">
                ~${(rewardsPerDayBalance * wineMimLPPrice).toFixed(2)}
              </div>
            )}{" "}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-5">
          <button onClick={() => claim()} className="app-btn w-full">
            {claimIsLoading ? <LoadingSpinner text="Claiming" /> : "Claim"}
          </button>
          <button onClick={() => compound()} className="app-btn w-full">
            {compoundIsLoading ? (
              <LoadingSpinner text="Compounding" />
            ) : (
              "Compound"
            )}
          </button>
        </div>
        <div className="text-sm flex justify-center opacity-75 pt-2">
          Claiming donates {claimFeeFormatted}% back to the pool, compounding
          does not
        </div>
      </Card>
    </div>
  );
});

Rewards.displayName = "Rewards";
export default Rewards;
