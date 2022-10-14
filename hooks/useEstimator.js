import { useContractRead, useNetwork } from 'wagmi';

// constants
import { ESTIMATOR, ROUTER } from '../constants';

export const useEstimator = ({ token0, token1, amount, enabled }) => {
  const { chain } = useNetwork();

  const estimateLPOut = useContractRead({
    addressOrName: ESTIMATOR[chain?.id]?.address,
    contractInterface: ESTIMATOR[chain?.id]?.abi,
    functionName: 'estimateLPOut',
    args: [ROUTER[chain?.id]?.address, token0, token1, amount],
    enabled,
  });

  return {
    estimateLPOut,
  }
}

export default useEstimator;