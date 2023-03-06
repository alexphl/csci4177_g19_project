"use client";

import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import { FaceFrownIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Reorder } from "framer-motion";
import { queryClient } from "@/app/QueryProvider";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";

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
	const userStocks = useQuery<string[]>({
		queryKey: [`/api/stocks/user`],
	});

	// Function to update user stock list
	// Implements optimistic updates
	const userStocksMut = useMutation({
		mutationFn: (newList: string[]) =>
			fetch(`/api/stocks/user`, {
				method: "POST",
				body: JSON.stringify(newList),
				headers: { "Content-Type": "application/json" },
			}),
		// When mutate is called:
		onMutate: async (newList) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ["/api/stocks/user"] });

			// Snapshot the previous value
			const previousList = queryClient.getQueryData(["/api/stocks/user"]);

			// Optimistically update to the new value
			queryClient.setQueryData(["/api/stocks/user"], () => newList);

			// Return a context object with the snapshotted value
			return { previousList };
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(["/api/stocks/user"], context!.previousList);
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["/api/stocks/user"] });
		},
	});

	const selectedStock = props.selectedStock;

	// Search state with debouncing and deferred value
	const [searchIsActive] = props.searchIsActive;
	const [isEditMode, setEditMode] = useState(false);
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
				!searchIsActive && userStocks.isSuccess && (
					<>
						<div className="flex w-[calc(100%) + 0.5rem] z-50 items-center justify-between sticky top-0 -mx-4 p-4 2xl:p-6 pb-0 bg-gradient-to-b from-black to-transparent -translate-y-4 rounded-2xl">
							<StockListbox />
							<button className={"rounded-md border border-neutral-800 backdrop-blur-md transition p-1.5 " + (isEditMode ? " bg-white/[0.8] text-black" : " bg-white/[0.1]")} onClick={() => setEditMode(!isEditMode)}><CubeTransparentIcon className="w-4"/></button>
						</div>
						<hr className="mb-4 mx-auto w-10 rounded-full border-neutral-600 2xl:my-6" />

						<Reorder.Group
							axis="y"
							values={userStocks.data}
							onReorder={(newOrder: string[]) => userStocksMut.mutate(newOrder)}
							as="ol"
							className={listStyle}
						>
							{userStocks.data.map((stock: string, i) => (
								<Reorder.Item
									key={stock}
									value={stock}
									dragListener={isEditMode || stock === selectedStock}
									initial={{ opacity: 0.5, scale: 0.95, filter: "blur(4px)" }}
									animate={{ opacity: 1, scale: 1, filter: "none" }}
									transition={{
										type: "spring",
										damping: 25,
										stiffness: 400,
										delay: i / 18,
									}}
								>
									<StockListItem
										stock={stock}
										isEditMode={isEditMode}
										userStocks={[userStocks.data, userStocksMut]}
										selected={stock === selectedStock}
										searchIsActive={searchIsActive}
									/>
								</Reorder.Item>
							))}
						</Reorder.Group>

						{userStocks.data.length === 0 && (
							<div className="flex w-full flex-col items-center justify-center gap-4 py-20 text-lg text-neutral-500">
								<div className="w-16 ">
									<SparklesIcon />
								</div>
								<div className="flex flex-col items-center">
									<h1 className="text-lg font-bold">Your list is empty</h1>
									<h2 className="text-sm font-medium">
										You can add stocks using search
									</h2>
								</div>
							</div>
						)}
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
									? " pointer-events-none scale-[0.98] blur-sm saturate-0"
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
									filtered &&
									filtered
										.slice(0, resultLimit)
										.map((result: any) => (
											<StockListItem
												key={result.symbol}
												userStocks={[userStocks.data, userStocksMut]}
												stock={result.symbol}
												searchIsActive={searchIsActive}
												selected={result.symbol === selectedStock}
											/>
										))
							}

							{
								/* SHOW LOADING PLACEHOLDER */
								searchResult.isFetching &&
									[...Array(3)].map((_x, i) => (
										<StockListItem
											userStocks={[userStocks.data, userStocksMut]}
											key={i}
											searchIsActive={searchIsActive}
											stock={null}
											selected={false}
										/>
									))
							}

							{
								/* NOT FOUND MESSAGE */
								searchResult.isSuccess && filtered && filtered.length === 0 && (
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
									filtered &&
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
