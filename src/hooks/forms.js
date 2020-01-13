import React, { useState } from "react";

export const useFormInput = () => {
	const [ value, setValue ] = useState("");
	const [ valid, setValid ] = useState(false);
	const inputChangeHandler = event => {
		const value = event.target.value;
		setValue(value);
		setValid(value.trim() !== "");
	};
	return { value: value, onChange: inputChangeHandler, valid };
};
