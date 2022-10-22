import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import Welcome from "./pages/Welcome";
import Published from "./pages/Published";
import Edit from "./pages/Edit";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path=":slug/edit" element={<Edit />} />
                    <Route path=":slug" element={<Published />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
