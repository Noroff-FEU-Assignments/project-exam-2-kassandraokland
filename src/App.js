import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import MyRoutes from "./utils/PageRoutes";
import './scss/App.scss';

function App() {
	return (
			<AuthProvider>
				<MyRoutes />
			</AuthProvider>
	);
}

export default App;
