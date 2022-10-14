import Head from "next/head";
// Components
import Assassinate from "../components/Assassinate";
import LotteryPrize from "../components/LotteryPrize";
import Notification from "../components/utils/Notification";
import Pool from "../components/Pool";
import Referrals from "../components/Referrals";
import Rewards from "../components/Reward";
import Staking from "../components/Staking";
import TopDepositedPrize from "../components/TopDepositedPrize";
import BackgroundDecoration from "../components/BackgroundDecoration";
import NetworkVerifier from "../components/NetworkVerifier";
import Footer from "../components/Footer";
import TopDescription from "../components/TopDescription";
import ToggleView from "../components/ToggleView";
import ProgressTimer from "../components/ProgressTimer";
import usePairPrice from "../hooks/usePairPrice";
import BackgroundGlows from "./BackgroundGlows";

// Context
import NotificationContext from "../context/NotificationContext";
// Hooks
import useNotification from "../hooks/useNotification";

export default function Home() {
  const notification = useNotification();
  const notificationState = {
    ...notification,
  };

  return (
    <div>
      <Head>
        <title>Grape Finance</title>
        <meta name="description" content="Grape Finance MIM pegged algo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NetworkVerifier />
      <BackgroundGlows />

      <main>
        <NotificationContext.Provider value={notificationState}>
          <Notification />
          <div className="grid gap-5 mx-auto max-w-5xl px-10">
            <div style={{ zIndex: 1 }} className="grid gap-4">
              <TopDescription />

              <ProgressTimer />
            </div>
          </div>
          {/* <div className="grid justify-center mx-auto mb-10 max-w-5xl px-5">
            <ToggleView />
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mx-auto mb-10 max-w-5xl px-5 mt-10">
            <div style={{ zIndex: 1 }} className="grid gap-4">
              <Pool />
              <TopDepositedPrize />
              <LotteryPrize />
            </div>
            <div style={{ zIndex: 1 }} className="grid gap-4">
              <Staking />
              <Rewards />
              <Assassinate />
            </div>
          </div>
          <div className="grid grid-cols-1 mx-auto mb-10 max-w-5xl px-5">
            {" "}
            <div style={{ zIndex: 1 }} className="grid gap-1">
              <Referrals />
            </div>
          </div>
          <Footer />
        </NotificationContext.Provider>
      </main>
    </div>
  );
}
