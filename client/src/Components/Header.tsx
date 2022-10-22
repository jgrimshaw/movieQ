
// @ts-nocheck
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// get the slug of selected serie in the edit page - series list 

function Header() {
    const { slug } = useParams();
    console.log(slug)

    return (

        <header>
            <Link to="/" className="header-menu-item--logo">movieQ</Link>
            <nav className='header-menu-items'>
                <Link to={`${slug}/edit`} className='header-menu-item'>edit</Link>
                <li className='header-menu-item'>preview</li>
                <Link to="slug" className='header-menu-item'>publish</Link>
                <li className='header-menu-item'>logout</li>
            </nav>
            <button className='header-btn'>Click here to get your 15% discount now!</button>
        </header>
    )


}

export default Header;
