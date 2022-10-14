import { memo, useContext, useMemo, useEffect, useState } from "react";
import { useAccount, useBlockNumber, useNetwork } from "wagmi";
import { utils } from "ethers";
import CountUp from "react-countup";
// Components
import Card from "./utils/Card";
import LoadingSpinner from "./utils/LoadingSpinner";
// Context
import NotificationContext from "../context/NotificationContext";
// Hooks
import usePrevious from "../hooks/usePrevious";
import { useMinerRead } from "../hooks/useMinerRead";
import { useMinerWrite } from "../hooks/useMinerWrite";
// Helpers
import { networkBlockExplorers } from "../helpers/networks";
import shortenAddress from "../helpers/shortenAddress";
import usePairPrice from "../hooks/usePairPrice";

const Assassinate = memo(() => {
  const AssassinationProfits = memo(() => {
    const account = useAccount();
    const { chain } = useNetwork();
    const { data: blockNumber } = useBlockNumber();
    const { userInfo } = useMinerRead();
    const wineMimLPPrice = usePairPrice();

    const assassinationProfits = useMemo(() => {
      if (!userInfo?.data) return 0;
      return utils.formatEther(userInfo?.data?.profitsAssassinated?.toString());
    }, [blockNumber, account, chain, userInfo?.data]);
    const prevAssassinationProfits = usePrevious(assassinationProfits);

    AssassinationProfits.displayName = "AssassinationProfits";
    return (
      <div className="flex justify-between">
        <div>Assassination Profits</div>
        <div style={{textAlign: 'right'}}>
          <CountUp
            start={prevAssassinationProfits}
            end={assassinationProfits}
            decimals={2}
            separator=","
          />{" "}
          sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(assassinationProfits * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    );
  });

  const AssassinateForm = memo(() => {
    // context
    const { popNotification } = useContext(NotificationContext);
    // hooks
    const account = useAccount();
    const { chain } = useNetwork();
    const { writeAssassinationAsync } = useMinerWrite();
    // state vars
    const [btnClass, setBtnClass] = useState("app-btn w-full");
    const [addressToAssassinate, setAddressToAssassinate] = useState("");
    const [assassinationIsLoading, setAssassinationIsLoading] = useState(false);

    useEffect(() => {
      const className = "app-btn w-full";
      if (!account) className += " btn-disabled";
      setBtnClass(className);
    }, [account]);

    const handleAddressToAssassinateChanged = (e) => {
      setAddressToAssassinate(e.target.value);
    };

    const assassinate = async () => {
      if (assassinationIsLoading) return;
      setAssassinationIsLoading(true);
      try {
        const req = await writeAssassinationAsync({
          args: [addressToAssassinate],
        });
        popNotification({
          type: "success",
          title: "Assassination Submitted",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
        });
        const tx = await req.wait();
        popNotification({
          type: "success",
          title: "Assassination Complete",
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
      setAssassinationIsLoading(false);
      setAddressToAssassinate("");
    };

    AssassinateForm.displayName = "AssassinateForm";
    return (
      <div className="grid grid-cols-1 gap-2 mt-5">
        <input
          type="text"
          name="assassinate"
          id="assassinate"
          placeholder="Address to Assassinate"
          value={addressToAssassinate}
          onChange={handleAddressToAssassinateChanged}
          className="text-right focus:ring-brand-2 focus:border-brand-2 block text-slate-500 sm:text-sm w-full shadow-inner rounded-md"
        />
        <button className={`${btnClass} mt-1`} onClick={() => assassinate()}>
          {assassinationIsLoading ? (
            <LoadingSpinner text="Assassinating" />
          ) : (
            <span>Assassinate</span>
          )}
        </button>
      </div>
    );
  });

  const AssassinateList = memo(() => {
    // context
    const { popNotification } = useContext(NotificationContext);
    // hooks
    const account = useAccount();
    const { chain } = useNetwork();
    const { usersNearAssassination } = useMinerRead();
    const { writeAssassinationAsync } = useMinerWrite();
    // state vars
    const [btnClass, setBtnClass] = useState("app-btn w-full");
    const [usersToAssassinate, setUsersToAssassinate] = useState([]);
    const [assassinationIsLoading, setAssassinationIsLoading] = useState({});

    useEffect(() => {
      const className = "app-btn w-full";
      if (!account) className += " btn-disabled";
      setBtnClass(className);
    }, [account]);

    useEffect(() => {
      if (usersNearAssassination?.isFetching) return;
      setUsersToAssassinate(usersNearAssassination.data);
    }, [usersNearAssassination]);

    const assassinate = async (user) => {
      if (assassinationIsLoading[user]) return;
      const loading = { ...assassinationIsLoading };
      loading[user] = true;
      setAssassinationIsLoading(loading);
      try {
        const req = await writeAssassinationAsync({
          args: [user],
        });
        popNotification({
          type: "success",
          title: "Assassination Submitted",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${req.hash}`,
        });
        const tx = await req.wait();
        popNotification({
          type: "success",
          title: "Assassination Complete",
          description: `View on ${networkBlockExplorers[chain?.id]?.name}`,
          link: `${networkBlockExplorers[chain?.id]?.url}/tx/${
            tx.transactionHash
          }`,
        });
      } catch (e) {
        popNotification({
          type: "error",
          title: "Assassination Error",
          description: e.toString(),
        });
      }
      setAssassinationIsLoading({});
    };

    AssassinateList.displayName = "AssassinateList";
    return (
      <div className="grid grid-cols-2 gap-2 mt-2 items-center">
        {usersToAssassinate?.map((user) => (
          <>
            <span className="text-lg flex justify-end">
              <a
                href={chain?.blockExplorers?.default?.url + "/address/" + user}
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <span className="mr-1">{shortenAddress(user)}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </span>
            <button className={btnClass} onClick={() => assassinate(user)}>
              {assassinationIsLoading[user] ? (
                <LoadingSpinner text="Assassinating" />
              ) : (
                <span>Assassinate</span>
              )}
            </button>
          </>
        ))}
      </div>
    );
  });

  return (
    <Card title="Assassinate" image="target.png">
      <AssassinationProfits />
      <AssassinateForm />
      <AssassinateList />
    </Card>
  );
});

Assassinate.displayName = "Assassinate";
export default Assassinate;
