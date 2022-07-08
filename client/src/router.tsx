import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import Welcome from "./pages/Welcome";
import Published from "./pages/Published";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path=":series" element={<Published />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
