'use client'

import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { usePathname } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home';
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
    const pathname = usePathname();
    let keys = pathname.split('/');
    keys.shift();

    return (
        <div style={{backgroundColor: 'indianred'}} role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home Page
                </Link>
                {
                    keys.map(item => {
                    return (
                        <Link key={item} underline="hover" color="inherit" href={`/`}>
                        {
                            item.charAt(0).toUpperCase()
                            + item.slice(1)
                        }
                        </Link>
                    )
                })};
            </Breadcrumbs>
        </div>
    );
}
