import React, { useState, useEffect, useReducer, useRef, useMemo } from "react";
import axios from "axios";
import List from "./List";
import { useFormInput } from "../hooks/forms";
const Todo = props => {
	//uncomment and comment useFormInput
	// const [ inputIsValid, setInputIsValid ] = useState(false);

	// uncomment this line and comment useRef
	// const [ todoName, setTodoName ] = useState("");

	// uncomment and comment the useReducer
	// const [ submittedTodo, setSubmittedTodo ] = useState(null);
	// const [ todoList, setTodoList ] = useState([]);

	//uncomment and comment useFormInput
	// const todoInputRef = useRef();

	const todoInput = useFormInput();
	const todoListReducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				return state.concat(action.payload);
			case "SET":
				return action.payload;
			case "REMOVE":
				return state.filter(todo => todo.id !== action.payload);
			default:
				return state;
		}
	};
	const [ todoList, dispatch ] = useReducer(todoListReducer, []);
	useEffect(() => {
		axios.get("https://hooks-31e8e.firebaseio.com/todos.json").then(res => {
			console.log(res);
			const todoData = res.data;
			const todos = [];
			for (let key in todoData) {
				todos.push({ id: key, name: todoData[key].name });
			}
			console.log(todos);
			dispatch({ type: "SET", payload: todos });
			// setTodoList(todos);
		});
		return () => {
			console.log("CleanUp");
		};
	}, []);

	// const mouseMoveHandler = event => {
	// 	console.log(event.clientX, event.clientY);
	// };
	// useEffect(() => {
	// 	document.addEventListener("mousemove", mouseMoveHandler);
	// 	return () => {
	// 		document.removeEventListener("mousemove", mouseMoveHandler);
	// 	};
	// }, []);

	// useEffect(
	// 	() => {
	// 		if (submittedTodo) {
	// 			dispatch({ type: "ADD", payload: submittedTodo });
	// 			// setTodoList(todoList => todoList.concat(submittedTodo));
	// 		}
	// 	},
	// 	[ submittedTodo ]
	// );

	// uncomment and comment useRef
	// const inputChangeHandler = event => {
	// 	setTodoName(event.target.value);
	// };
	const todoAddHandler = () => {
		const todoName = todoInput.value;
		// const todoName = todoInputRef.current.value;
		axios
			.post("https://hooks-31e8e.firebaseio.com/todos.json", { name: todoName })
			.then(res => {
				console.log(res);
				setTimeout(() => {
					const todoItem = { id: res.data.name, name: todoName };
					dispatch({ type: "ADD", payload: todoItem });
					// setSubmittedTodo(todoItem);
				}, 3000);
			})
			.catch(err => {
				console.log(err);
			});
	};
	const todoRemoveHandler = todoId => {
		axios
			.delete(`https://hooks-31e8e.firebaseio.com/todos/${todoId}.json`)
			.then(res => {
				dispatch({ type: "REMOVE", payload: todoId });
			})
			.catch(err => console.log(err));
	};
	// const inputValidationHandler = event => {
	// 	// setInputIsValid(event.target.value.trim() !== "");
	// 	if (event.target.value.trim() === "") {
	// 		setInputIsValid(false);
	// 	} else {
	// 		setInputIsValid(true);
	// 	}
	// };
	return (
		<React.Fragment>
			<input
				type="text"
				placeholder="Todo"
				value={todoInput.value}
				onChange={todoInput.onChange}
				style={{ backgroundColor: todoInput.valid ? "transparent" : "red" }}
				// ref={todoInputRef}
				// onChange={inputValidationHandler}
				// style={{ backgroundColor: inputIsValid ? "transparent" : "red" }}
				// onChange={inputChangeHandler}
				// value={todoName}
			/>
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			{useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [ todoList ])}
		</React.Fragment>
	);
};
export default Todo;
