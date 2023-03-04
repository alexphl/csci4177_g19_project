import { memo, useDeferredValue, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import { Transition } from "@headlessui/react";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

// Lazy-load components
const StockListItem = dynamic(() => import("./StockListItem"));
const StockListbox = dynamic(() => import("./Listbox"));

const listStyle = "flex flex-col gap-2.5 transition";

const StockList = (props: {
	searchIsActive: any;
	searchQuery: any;
	selectedStock: string | undefined;
}) => {
	const [userStocks] = useState(["AAPL", "MSFT", "NVDA"]);
	const selectedStock = props.selectedStock;

	// Search state with debouncing and deferred value
	const [searchIsActive, setSearchIsActive] = props.searchIsActive;
	const [searchQuery] = props.searchQuery;
	const [debouncedQuery] = useDebounce(searchQuery, 600); // Debounce query with a delay
	const searchResult = useQuery<any>({queryKey: [`/api/stocks/search/`, debouncedQuery.trim()], enabled: !!debouncedQuery});
	const deferredSearchResult = useDeferredValue(searchResult.data);

	useEffect(() => {
		console.log(searchResult);
	}, [searchResult]);

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
							<ul className={listStyle}>
								{userStocks.map((stock: string) => (
									<StockListItem
										key={stock}
										stock={stock}
										selected={stock === selectedStock}
									/>
								))}
							</ul>
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
									? " scale-[0.98] blur-sm saturate-0"
									: "")
							}
						>
							{
								/* SHOW ALL STOCKS */
								!searchResult.isFetching && !deferredSearchResult &&
									userStocks.map((result: any) => (
										<StockListItem
											key={result}
											stock={result}
											selected={result === selectedStock}
											onClick={() => setSearchIsActive(true)}
										/>
									))
							}

							{
								/* SHOW SEARCH RESULTS */
								searchResult.isSuccess && deferredSearchResult &&
									deferredSearchResult.result.map((result: any) => (
										!result.symbol.includes('.') && !result.symbol.includes(':') &&
										<StockListItem
											key={result.symbol}
											stock={result.symbol}
											selected={result.symbol === selectedStock}
											onClick={() => setSearchIsActive(true)}
										/>
									))
							}

							{
								/* NOT FOUND MESSAGE */
								searchResult.isSuccess && deferredSearchResult && deferredSearchResult.count === 0 && (
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
						</ul>
					</>
				)
			}
		</>
	);
};

export default memo(StockList);
