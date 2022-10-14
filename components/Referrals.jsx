import { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import { utils } from "ethers";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Context
import NotificationContext from "../context/NotificationContext";
// Components
import Card from "./utils/Card";
// Hooks
import useMinerRead from "../hooks/useMinerRead";
import usePairPrice from "../hooks/usePairPrice";

export default function Referrals() {
  const { popNotification } = useContext(NotificationContext);
  const account = useAccount();
  const { userInfo } = useMinerRead();
  const [link, setLink] = useState("");
  const [btnText, setBtnText] = useState("Copy");
  const [referrerRewards, setReferrerRewards] = useState(0);
  const wineMimLPPrice = usePairPrice();

  const handleCopy = () => {
    setBtnText("Copied!");
    popNotification({
      title: "Copied successfully!",
      description: "Your referral link has been copied to your clipboard",
      type: "success",
      duration: 6000,
    });
    setTimeout(() => {
      setBtnText("Copy");
    }, 6000);
  };

  useEffect(() => {
    if (!account) return setLink("Connect to receive a link");
    if (typeof window === undefined) return setLink("loading...");
    setLink(window.location.origin + "?ref=" + account.address);
  }, [account]);

  useEffect(() => {
    if (!userInfo || userInfo?.isFetching || !account) return;
    setReferrerRewards(
      utils.formatEther(userInfo.data?.referrerFees.toString() || "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.length, account]); // .length to prevent infinite loop

  return (
    <Card title="Referrals" image="referral.png">
      <div className="flex justify-between">
        <div>Your Referral Rewards (1.5% of referred deposits)</div>
        <div style={{textAlign: 'right'}}>
          <CountUp end={referrerRewards} decimals={2} separator="," /> sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(referrerRewards * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-5">
        <input
          id="link"
          type="text" 
          value={link}
          onChange={() => {}}
          className="w-full focus:ring-brand-2 focus:border-brand-2 block text-slate-500 sm:text-sm shadow-inner rounded-md"
        ></input>
        <CopyToClipboard text={link} onCopy={() => handleCopy()}>
          <button className="app-btn w-full mt-1">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{btnText}</span>
            </div>
          </button>
        </CopyToClipboard>
      </div>
      <div className="text-sm flex justify-center opacity-75 pt-2">
        You will receive rewards when users deposit with your link
      </div>
    </Card>
  );
}
