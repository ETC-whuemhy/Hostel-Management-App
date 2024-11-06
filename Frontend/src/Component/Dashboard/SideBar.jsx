import React, { useState } from 'react';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';

const dashboardLinks = [
    {title: 'Dashboard', route: '/home-dash'},
    {title: 'Student', route: '#'},
    {title: 'Room', route: '#'},
    {title: 'Report', route: '#'}
]

const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleLinkClick = (index) => {
        setActiveIndex(index)
    }

  return (
    <aside className='--flex-start'>
        <div className="left">
            {dashboardLinks.map(({title, route}, index) => (
                <div className="--flex-center --dir-column">
                    <NavLink to={route} className={index === activeIndex ? 'active-link' : ''} onClick={() => handleLinkClick(index)}>{title}</NavLink>
                </div>
            ))}
        </div>
    </aside>
  )
}

export default SideBar