import React from "react";
import TodoList from "./TodoList/TodoList";

const Home = () => {
	return (
		<div style={{height:"100vh"}} className=" d-flex justify-content-center align-items-center flex-column">
			  <h1 >Todolist</h1>
			<TodoList/>
		</div>
	);
};

export default Home;