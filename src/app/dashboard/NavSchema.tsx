import {
  ChartPieIcon,
  ArrowTrendingUpIcon,
  PresentationChartBarIcon,
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
    icon: <ArrowTrendingUpIcon />,
  },
  {
    heading: "Customers",
    link: "/dashboard/customers",
    icon: <UsersIcon />,
  },
  {
    heading: "Accounts",
    link: "/dashboard/accounts",
    icon: <WalletIcon />,
  },
  {
    heading: "Transactions",
    link: "/dashboard/transactions",
    icon: <ReceiptPercentIcon />,
  },
];

export const contentExplore = [
  {
    heading: "News",
    link: "/dashboard/news",
    icon: <NewspaperIcon />,
  },
  {
    heading: "Analytics",
    link: "/dashboard/analytics",
    icon: <ChartPieIcon />,
  },
  {
    heading: "Simulation",
    link: "/dashboard/simulation",
    icon: <PresentationChartBarIcon />,
  },
];

export const contentSettings = [
  {
    heading: "Preferences",
    link: "/dashboard/settings",
    icon: <CogIcon />,
  },
];

export const mobileBar = [
  contentBrowse[0],		// stocks
  contentBrowse[1],		// customers
  contentBrowse[2],		// accounts
  contentExplore[0],	// news
]
