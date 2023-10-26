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

function mapBreadcrumbs(breadcrumbs: string[]): string[] {
    const mappedBreadcrumbs: string[] = [];
    for (let i = 0; i < breadcrumbs.length; i++) {
        if (i === 0) {
            mappedBreadcrumbs.push(breadcrumbs[i]);
        } else {
            mappedBreadcrumbs.push(breadcrumbs.slice(0, i + 1).join("/"));
        }
    }
    return mappedBreadcrumbs;
}

export default function BasicBreadcrumbs() {
    const pathname = usePathname();
    let keys = pathname.split('/');
    keys.shift();
    const mappedBreadcrumbs = mapBreadcrumbs(keys);
    return (
        <div style={{backgroundColor: 'indianred'}} role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home Page
                </Link>
                {
                    keys.map((item, index) => {
                        const path = mappedBreadcrumbs[index];
                    return (
                        <Link key={item} underline="hover" color="inherit" href={`/${path}`}>
                        {
                            decodeURIComponent(item.charAt(0).toUpperCase()
                            + item.slice(1))
                        }
                        </Link>
                    )
                })};
            </Breadcrumbs>
        </div>
    );
}
