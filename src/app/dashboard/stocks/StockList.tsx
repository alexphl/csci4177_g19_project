import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import { Transition } from "@headlessui/react";
import { FaceFrownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

// Lazy-load components
const StockListItem = dynamic(() => import("./StockListItem"));
const StockListbox = dynamic(() => import("./Listbox"));

const listStyle = "flex flex-col gap-2.5 transition";

// Filters search results to hide stock subvariants
// This logic will likely be moved to backend
function filterResults(array: any) {
	return (
		array &&
		array.filter((item: any) => {
			if (item.symbol.includes(".") || item.symbol.includes(":")) return false;
			if (item.type === "Common Stock" || item.type === "ADR") return true;

			return false;
		})
	);
}

const StockList = (props: {
	searchIsActive: any;
	searchQuery: any;
	selectedStock: string | undefined;
}) => {
	const [userStocks] = useState(["AAPL", "MSFT", "NVDA"]);
	const selectedStock = props.selectedStock;

	// Search state with debouncing and deferred value
	const [searchIsActive] = props.searchIsActive;
	const [searchQuery] = props.searchQuery;
	const [debouncedQuery] = useDebounce(searchQuery, 600); // Debounce query with a delay
	const [resultLimit, setResultLimit] = useState(5);
	const searchResult = useQuery<any>({
		queryKey: [`/api/stocks/search/`, escape(debouncedQuery.trim())],
		enabled: !!debouncedQuery,
		staleTime: Infinity,
	});

	// Filter search results
	const filtered = useMemo(
		() =>
			filterResults(
				searchResult.isSuccess &&
					searchResult.data.result &&
					searchResult.data.result
			),
		[searchResult]
	);

	// Reset search result limit between searches
	useEffect(() => {
		setResultLimit(5);
	}, [debouncedQuery]);

	return (
		<>
			{
				/* SHOW USER STOCKS */
				!searchIsActive && (
					<>
						<StockListbox />
						<hr className="my-4 mx-auto w-10 rounded-full border-neutral-600 2xl:my-6" />

						<Transition
							appear={true}
							show={!searchIsActive}
							enter="transition duration-300 ease-out"
							enterFrom="transform blur-sm scale-95 opacity-50"
							enterTo="transform scale-100 opacity-100"
						>
							<ol className={listStyle}>
								{userStocks.map((stock: string) => (
									<StockListItem
										key={stock}
										stock={stock}
										selected={stock === selectedStock}
									/>
								))}
							</ol>
						</Transition>
					</>
				)
			}

			{
				/* SHOW SEARCH RESULTS OR ALL STOCKS */
				searchIsActive && (
					<>
						<h1 className="px-2.5 pt-1 pb-6 font-bold text-neutral-300">
							Search Results
						</h1>

						<ul
							className={
								listStyle +
								(searchQuery !== debouncedQuery || searchResult.isFetching
									? " scale-[0.98] blur-sm saturate-0 pointer-events-none"
									: "")
							}
						>
							{
								/* SHOW SEARCH ICON BG */
								!searchResult.isFetching && !searchResult.data && (
									<div className="flex w-full flex-col items-center justify-center py-20 text-lg text-neutral-900">
										<div className="w-24 ">
											<MagnifyingGlassIcon />
										</div>
									</div>
								)
							}

							{
								/* SHOW SEARCH RESULTS */
								searchResult.isSuccess &&
									filtered
										.slice(0, resultLimit)
										.map((result: any) => (
											<StockListItem
												key={result.symbol}
												stock={result.symbol}
												selected={result.symbol === selectedStock}
											/>
										))
							}

							{
								/* SHOW LOADING PLACEHOLDER */
								searchResult.isFetching &&
									[...Array(3)].map((_x, i) => (
										<StockListItem
											key={i}
											stock={null}
											selected={false}
										/>
									))
							}

							{
								/* NOT FOUND MESSAGE */
								searchResult.isSuccess && filtered.length === 0 && (
									<div className="flex w-full flex-col items-center justify-center gap-4 py-20 text-lg text-neutral-500">
										<div className="w-16 ">
											<FaceFrownIcon />
										</div>
										<div className="flex flex-col items-center">
											<h1 className="text-lg font-bold">
												Sorry, we found nothing
											</h1>
											<h2 className="text-sm font-medium">
												Try a different search query
											</h2>
										</div>
									</div>
								)
							}

							{
								/* SHOW MORE BUTTON */
								searchResult.isSuccess &&
									searchResult.data.result &&
									filtered.length > resultLimit && (
										<button
											className="mx-auto mt-4 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium active:opacity-70"
											onClick={() => setResultLimit(resultLimit + 3)}
										>
											Show more
										</button>
									)
							}
						</ul>
					</>
				)
			}
		</>
	);
};

export default memo(StockList);
