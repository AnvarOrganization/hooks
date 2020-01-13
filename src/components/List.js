import React from "react";

const List = props => {
	console.log("List Rendering...");
	return (
		<ul>
			{props.items.map(item => {
				return (
					<li key={item.id} onClick={() => props.onClick(item.id)}>
						{item.name}
					</li>
				);
			})}
		</ul>
	);
};

export default List;
