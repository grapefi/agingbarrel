import { useEffect, useState } from "react";
import { useNetwork, useContractRead } from "wagmi";
import { getDefaultProvider } from "ethers";

// constants
import {
  TOKEN,
  GRAPEMIM,
  MIM,
  XGRAPE,
  GRAPE_MIM_SW,
  GRAPE_MIM_SW_MAGIK,
  VINTAGEORACLE,
} from "../constants";

export const usePairPrice = () => {
  const { chain } = useNetwork();
  const provider = getDefaultProvider();
  const [pairPrice, setPairPrice] = useState();

  const LPContract = {
    addressOrName: TOKEN[chain?.id]?.address,
    contractInterface: TOKEN[chain?.id]?.abi,
  };

  const xGrapeContract = {
    addressOrName: XGRAPE[chain?.id]?.address,
    contractInterface: XGRAPE[chain?.id]?.abi,
  };

  const vintageOracleContract = {
    addressOrName: VINTAGEORACLE[chain?.id]?.address,
    contractInterface: VINTAGEORACLE[chain?.id]?.abi,
  };

  const { data: vintagePrice } = useContractRead({
    ...vintageOracleContract,
    functionName: "sVintagePrice",
  });

  const { data: grapeXGrapeSupply } = useContractRead({
    ...LPContract,
    functionName: "totalSupply",
  });

  const { data: xGrapeBalance } = useContractRead({
    ...xGrapeContract,
    functionName: "balanceOf",
    args: [LPContract.addressOrName],
  });

  useEffect(() => {
    async function retrievePrice() {
      const formattedvintagePrice = Number(vintagePrice) / Math.pow(10, 18);
      const lpSupply = Number(grapeXGrapeSupply) / Math.pow(10, 18);
      const xGrapeBalanceInLP = Number(xGrapeBalance) / Math.pow(10, 18);
      console.log(formattedvintagePrice)
      setPairPrice(formattedvintagePrice);
    }
    if (
      chain &&
      provider &&
      xGrapeBalance &&
      grapeXGrapeSupply &&
      vintagePrice
    ) {
      retrievePrice();
    }
  }, [chain, provider, xGrapeBalance, grapeXGrapeSupply, vintagePrice]);

  return pairPrice;
};

export default usePairPrice;
