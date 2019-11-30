import React from 'react';
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Timeline = () => {
	let query = useQuery();

	return (
		<div>
			Here is the timeline component
			<p>query.get("timelineid") is: {query.get("timelineid")}</p>
		</div>
	);
};

export default Timeline;
