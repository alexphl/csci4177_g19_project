import {
	ChartPieIcon,
	ArrowTrendingUpIcon,
	PresentationChartBarIcon,
	UsersIcon,
	WalletIcon,
	ReceiptPercentIcon,
	CogIcon,
	NewspaperIcon,
} from "@heroicons/react/20/solid";

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
