import { render } from '@testing-library/react';
import { React } from 'react';

//create nav links at top of page that conditionally renders component based on selected link
function NavTabs({ currentPage, handlePageChange }) {

    return (
        <nav>

          
            {/* each link uses setter from useState in MainContainer file to change current page */}
            <ul>
                <li>
                    <a
                        href="#dashboard"
                        onClick={() => handlePageChange('Dashboard')}
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a
                        href="#campaigns"
                        onClick={() => handlePageChange('Campaigns')}
                    >
                        My Campaigns
                    </a>
                </li>
                <li>
                    <a
                        href="#characters"
                        onClick={() => handlePageChange('Characters')}
                    >
                        My Characters
                    </a>
                </li>
                <li>
                    <a
                        href="#resources"
                        onClick={() => handlePageChange('Resources')}
                    >
                        Questions
                    </a>
                </li>
            </ul>


        </nav>
    );
}

export default NavTabs;