import { useAccount, useContractRead, useNetwork } from "wagmi";

// constants
import { MINER } from "../constants";

export const useMinerRead = () => {
  const account = useAccount();
  const { chain } = useNetwork();

  const minerContract = {
    addressOrName: MINER[chain?.id]?.address,
    contractInterface: MINER[chain?.id]?.abi,
  };

  const rewardsPerDay = useContractRead({
    ...minerContract,
    args: account?.address,
    functionName: "rewardsPerDay",
  });

  const claimFee = useContractRead({
    ...minerContract,
    functionName: "claimFee",
  });

  const calculatePrice = useContractRead({
    ...minerContract,
    functionName: "calculatePrice",
    cacheOnBlock: true,
  });

  const trackedProfit = !account
    ? null
    : useContractRead({
        ...minerContract,
        functionName: "calculateTrackedProfit",
        args: account?.address,
        cacheOnBlock: true,
      });

  const userInfo = !account
    ? null
    : useContractRead({
        ...minerContract,
        functionName: "userInfo",
        args: account?.address,
        cacheOnBlock: true,
      });

  const usersNearAssassination = useContractRead({
    ...minerContract,
    functionName: "fetchAllUsersNearAssassination",
    args: 950, // users 95% of the way to being assassinated
    cacheOnBlock: true,
  });

  const pendingRewards = !account
    ? null
    : useContractRead({
        ...minerContract,
        functionName: "pendingRewards",
        args: account?.address,
        cacheOnBlock: true,
      });

  const totalDeposited = useContractRead({
    ...minerContract,
    functionName: "totalDeposited",
    cacheOnBlock: true,
  });

  return {
    rewardsPerDay,
    claimFee,
    pendingRewards,
    totalDeposited,
    calculatePrice,
    trackedProfit,
    userInfo,
    usersNearAssassination,
  };
};

export default useMinerRead;
