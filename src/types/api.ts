export type AutocompleteModsResult = {
	name: string;
	slug: string;
};

export type SortOrders =
	| "name"
	| "downloads"
	| "followers"
	| "lastUpdated"
	| "created";
