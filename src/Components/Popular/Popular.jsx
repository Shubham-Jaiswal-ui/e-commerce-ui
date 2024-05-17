import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
const Popular = () => {
	const [popularInWomen, setPopularInWomen] = useState([]);
	const fetchPopularInWOmen = async () => {
		fetch("http://localhost:4000/popularinwomen")
			.then((response) => response.json())
			.then((data) => setPopularInWomen(data));
	};
	useEffect(() => {
		fetchPopularInWOmen();
	}, []);

	return (
		<div className="popular">
			<h1>POPULAR IN WOMEN</h1>
			<hr />
			<div className="popular-item">
				{popularInWomen.map((item, i) => {
					return (
						<Item
							key={i}
							id={item.id}
							name={item.name}
							image={item.image}
							new_price={item.new_price}
							old_price={item.old_price}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Popular;
