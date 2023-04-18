import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './sidebar.scss';

const Sidebar = (props: Props) => {
    const { currentPage, sidebarItems } = props;

    return (
        <div className='page-style width100'>
            <div className="sidebar">
                <h4 className='bank-name font-poppins'>Zscaler Assignment</h4>
                <div className='side-link-container font-poppins vflex-colomn vflex'>
                    {
                        sidebarItems.map((sidebarItem: SideBarItemType, index: number) => {
                            const { title, path} = sidebarItem ?? {};
                            return (
                                <Link
                                    to={path}
                                    className={`side-link text-decoration-none ${currentPage === title ? 'fw500' : 'opacity'}`}
                                    key={title+index}
                                >
                                    {title}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className='page-content'>
                {props.children}
            </div>
        </div>


    );
}


type SideBarItemType = {
    title: string;
    path: string;
}

type Props = {
    currentPage: string;
    sidebarItems: SideBarItemType[];
    children: React.ReactNode;
}


export default Sidebar;