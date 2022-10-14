import { useEffect, useState } from "react";
import { utils } from "ethers";
import CountUp from "react-countup";
// Components
import Card from "./utils/Card";
// Hooks
import useLottoRead from "../hooks/useLottoRead";
// Helpers
import shortenAddress from "../helpers/shortenAddress";
import usePairPrice from "../hooks/usePairPrice";

export default function TopDepositedPrize() {
  const { largestDaily } = useLottoRead();
  const [largestDepositor, setLargestDepositer] = useState("Loading...");
  const [largestDepositAmount, setLargestDepositAmount] = useState(0);
  const wineMimLPPrice = usePairPrice();

  useEffect(() => {
    if (!largestDaily || largestDaily.isFetching) return;
    setLargestDepositer(shortenAddress(largestDaily.data?.depositor));
    setLargestDepositAmount(
      utils.formatEther(largestDaily.data?.amount.toString() || "0")
    );
  }, [largestDaily?.internal?.dataUpdatedAt]);

  return (
    <Card title="Top Deposit Prize" image="medal.png">
      <div className="flex justify-between">
        <div>Depositor</div>
        <div>{largestDepositor}</div>
      </div>
      <div className="flex justify-between">
        <div>Amount</div>
        <div style={{textAlign: 'right'}}>
          <CountUp end={largestDepositAmount} decimals={2} separator="," />{" "}
          sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(largestDepositAmount * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
