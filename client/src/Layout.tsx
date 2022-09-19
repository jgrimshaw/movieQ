import { Outlet } from "react-router-dom";
import "./layout.scss";
import Header from "./Components/Header";

export default function Layout() {
    return (
        <main>
            <Header />
            <section>
                <Outlet />
            </section>
        </main>
    );
}
