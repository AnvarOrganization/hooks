import React, { useState } from "react";
import AuthContext from "./auth-context";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
const App = () => {
	const [ page, setPage ] = useState("auth");
	const [ authStatus, setAuthStatus ] = useState(false);
	const switchPage = pageName => {
		setPage(pageName);
	};
	const login = () => {
		setAuthStatus(true);
	};
	return (
		<div>
			<AuthContext.Provider value={{ status: authStatus, login: login }}>
				<Header onLoadTodos={() => switchPage("todos")} onLoadAuth={() => switchPage("auth")} />
				<hr />
				{page === "auth" ? <Auth /> : <Todo />}
			</AuthContext.Provider>
		</div>
	);
};

export default App;
