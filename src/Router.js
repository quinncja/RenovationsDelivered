import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import App from "./App";
import Dashboard from "./Dashboard";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="/*" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Route>
            </Routes>
        </BrowserRouter>
)}

export default Router;