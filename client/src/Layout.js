import { Outlet } from "react-router-dom";
import "./layout.scss";

export default function Layout() {
    return (
        <main>
            <header>movieQ</header>
            <section className="content">
                <Outlet />
            </section>
        </main>
    );
}
