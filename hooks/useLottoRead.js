import { useAccount, useContractRead, useNetwork } from 'wagmi';

// constants
import { LOTTO } from '../constants';

export const useLottoRead = () => {
  const { chain } = useNetwork();
  const account = useAccount();

  const chanceToWinDaily = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'chanceToWinDaily',
    args: account?.address,
    cacheOnBlock: true,
    watch: true
  });

  const dailyDepositPot = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'dailyDepositPot',
    cacheOnBlock: true
  });

  const largestDaily = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'largestDaily',
    cacheOnBlock: true
  });

  const largestDailyPot = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'largestDailyPot',
    cacheOnBlock: true
  });

  const monthlyWinnersPot = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'monthlyWinnersPot',
    cacheOnBlock: true
  });

  const timeLeftUntilNewDay = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'timeLeftUntilNewDay',
    cacheOnBlock: true,
  });

  const timeLeftUntilNewMonth = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'timeLeftUntilNewMonth',
    cacheOnBlock: true
  });

  const userWinnings = useContractRead({
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
    functionName: 'userWinnings',
    args: account?.address,
    cacheOnBlock: true,
  });

  return {
    chanceToWinDaily,
    dailyDepositPot,
    largestDaily,
    largestDailyPot,
    monthlyWinnersPot,
    timeLeftUntilNewDay,
    timeLeftUntilNewMonth,
    userWinnings,
  }
}

export default useLottoRead;