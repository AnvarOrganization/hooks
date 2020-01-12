import React, { useState, useEffect } from "react";
import axios from "axios";
const Todo = props => {
	const [ todoName, setTodoName ] = useState("");
	const [ todoList, setTodoList ] = useState([]);

	useEffect(() => {
		axios.get("https://hooks-31e8e.firebaseio.com/todos.json").then(res => {
			console.log(res);
			const todoData = res.data;
			const todos = [];
			for (let key in todoData) {
				todos.push({ key: key, name: todoData[key].name });
			}
			console.log(todos);
			setTodoList(todos);
		});
		return () => {
			console.log("CleanUp");
		};
	}, []);
	const mouseMoveHandler = event => {
		console.log(event.clientX, event.clientY);
	};
	useEffect(() => {
		document.addEventListener("mousemove", mouseMoveHandler);
		return () => {
			document.removeEventListener("mousemove", mouseMoveHandler);
		};
	}, []);

	const inputChangeHandler = event => {
		setTodoName(event.target.value);
	};
	const todoAddHandler = () => {
		setTodoList(todoList.concat(todoName));
		axios
			.post("https://hooks-31e8e.firebaseio.com/todos.json", { name: todoName })
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<React.Fragment>
			<input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} />
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			<ul>
				{todoList.map(todo => {
					return <li key={todo.key}>{todo.name}</li>;
				})}
			</ul>
		</React.Fragment>
	);
};
export default Todo;
