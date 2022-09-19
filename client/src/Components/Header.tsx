

function Header() {
  return (
    <header>
        <div className="header-menu-item--logo">movieQ</div>
            <ul className='header-menu-items'>
                <li className='header-menu-item'>edit</li>
                <li className='header-menu-item'>preview</li>
                <li className='header-menu-item'>publish</li>
                <li className='header-menu-item'>logout</li>
            </ul>
        <button className='header-btn'>Click here to get your 15% discount now!</button>
    </header>
    )
}

export default Header
