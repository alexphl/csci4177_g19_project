/**Author: Olexiy Prokhvatylo B00847680 */

import {
  ChartPieIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  UsersIcon,
  WalletIcon,
  ReceiptPercentIcon,
  CogIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

export const contentBrowse = [
  {
    heading: "Stocks",
    link: "/dashboard/stocks",
    icon: <ArrowTrendingUpIcon fill="rgba(255,255,255,0.2)" />,
  },
  {
    heading: "Customers",
    link: "/dashboard/customers",
    icon: <UsersIcon fill="rgba(255,255,255,0.2)" />,
  },
  {
    heading: "Accounts",
    link: "/dashboard/accounts",
    icon: <WalletIcon fill="rgba(255,255,255,0.2)" />,
  },
  {
    heading: "Transactions",
    link: "/dashboard/transactions",
    icon: <ReceiptPercentIcon fill="rgba(255,255,255,0.2)" />,
  },
];

export const contentExplore = [
  {
    heading: "News",
    link: "/dashboard/news",
    icon: <NewspaperIcon fill="rgba(255,255,255,0.2)" />,
  },
  {
    heading: "Analytics",
    link: "/dashboard/analytics",
    icon: <ChartPieIcon fill="rgba(255,255,255,0.2)" />,
  },
  {
    heading: "Simulation",
    link: "/dashboard/simulation",
    icon: <AcademicCapIcon fill="rgba(255,255,255,0.2)" />,
  },
];

export const contentSettings = [
  {
    heading: "Preferences",
    link: "/dashboard/preferences",
    icon: <CogIcon fill="rgba(255,255,255,0.2)" />,
  },
];

export const mobileBar = [
  contentBrowse[0],		// stocks
  contentBrowse[1],		// customers
  contentBrowse[2],		// accounts
  contentExplore[0],	// news
]
