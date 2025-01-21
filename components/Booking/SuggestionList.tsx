interface SuggestionsListProps {
	suggestions: string[];
	onSelect: (value: string) => void;
}

const SuggestionsList = ({ suggestions, onSelect }: SuggestionsListProps) => {
	if (suggestions.length === 0) return null;

	return (
		<ul className="border-[1px] mt-2 bg-white rounded-md shadow-sm max-h-40 overflow-auto">
			{suggestions.map((suggestion, index) => (
				<li
					key={index}
					onClick={() => {
						onSelect(suggestion);
					}}
					className="p-2 hover:bg-gray-100 cursor-pointer"
				>
					{suggestion}
				</li>
			))}
		</ul>
	);
};

export default SuggestionsList;
