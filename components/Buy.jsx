import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import metamaskImg from "../public/img/metamask.png";
import Image from "next/image";

export default function Buy() {
  const [ethereum, setEthereum] = useState();

  useEffect(() => {
    const { ethereum } = window;
    setEthereum(ethereum);
  }, []);

  const watchOnMM = (assetName) => {
    let address;
    let image;

    if (assetName === "xGRAPE") {
      address = "0xe00b91f35924832d1a7d081d4dced55f3b80fb5c";
      image =
        "https://raw.githubusercontent.com/grapefi/front-end/77fa78f2b05b9fecfc0ebd43aef4560c0c00890b/src/assets/img/xGrape.png";
    } else if (assetName === "MIM") {
      address = "0x130966628846BFd36ff31a822705796e8cb8C18D";
      image =
        "https://raw.githubusercontent.com/grapefi/front-end/77fa78f2b05b9fecfc0ebd43aef4560c0c00890b/src/assets/img/mim.png";
    }
    if (ethereum) {
      ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: address,
            symbol: assetName,
            decimals: 18,
            image: image,
          },
        },
      });
    }
  };

  return (
    <div className="top-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="app-btn inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center">
              <span className="mr-2">Buy</span>
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://winemaker.grapefinance.app/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Mint sVintage
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://app.bogged.finance/avax/swap?tokenIn=AVAX&tokenOut=0x130966628846BFd36ff31a822705796e8cb8C18D"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Buy MIM
                  </a>
                )}
              </Menu.Item>
              <hr />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => watchOnMM("sVintage")}
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image
                      alt="Metamask"
                      src={metamaskImg}
                      width={30}
                      height={30}
                    />{" "}
                    Add sVintage
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => watchOnMM("MIM")}
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image
                      alt="Metamask"
                      src={metamaskImg}
                      width={30}
                      height={30}
                    />{" "}
                    Add MIM
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
