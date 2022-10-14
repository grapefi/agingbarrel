import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { utils } from "ethers";
// Components
import Card from "./utils/Card";
// Hooks
import useMinerRead from "../hooks/useMinerRead";
import usePairPrice from "../hooks/usePairPrice";

export default function Pool(lpPrice) {
  const { totalDeposited } = useMinerRead();
  const [depositedAmount, setDepositedAmount] = useState(0);
  const grapeXGrapePrice = usePairPrice();

  useEffect(() => {
    if (
      totalDeposited.isError ||
      !totalDeposited.isFetched ||
      totalDeposited.isLoading
    )
      return;
    setDepositedAmount(
      utils.formatEther(totalDeposited.data?.toString() || "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDeposited.data]);

  return (
    <Card title="Aging Barrel Balance" image="soda.png">
      <div className="flex justify-between">
        <h1>Total Deposited</h1>
        <div style={{ textAlign: "right" }}>
          <CountUp end={depositedAmount} decimals={2} separator="," /> sVintage
          {grapeXGrapePrice && (
            <div className="text-xs">~${(depositedAmount * grapeXGrapePrice).toFixed(2)}</div>
          )}
        </div>
      </div>
      {/* <div className="flex justify-between">
        <h1>Total Claimed</h1>
        <div>
          <CountUp end={depositedAmount} decimals={2} separator="," />
        </div>
      </div>
      <div className="flex justify-between">
        <h1>Total Drawings</h1>
        <div>
          <CountUp end={500} decimals={2} separator="," />
        </div>
      </div> */}
    </Card>
  );
}
