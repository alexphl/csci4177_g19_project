import {
	ChartPieIcon,
	ArrowTrendingUpIcon,
	PresentationChartBarIcon,
	UsersIcon,
	WalletIcon,
	ReceiptPercentIcon,
	MapIcon,
	CogIcon
} from "@heroicons/react/20/solid";

export const contentBrowse = [
	{
		heading: "Stocks",
		link: "/dashboard/stocks",
		icon: <ArrowTrendingUpIcon />,
	},
	{
		heading: "Simulation",
		link: "/dashboard/simulation",
		icon: <PresentationChartBarIcon />,
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
		heading: "Analytics",
		link: "/dashboard/analytics",
		icon: <ChartPieIcon />,
	},
	{
		heading: "Map",
		link: "/dashboard/map",
		icon: <MapIcon />,
	},
];

export const contentSettings = [
	{
		heading: "Preferences",
		link: "/dashboard/settings",
		icon: <CogIcon />,
	},
];
