'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NestedMenuItem } from 'mui-nested-menu';
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AppCategories() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/categories",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <div>
            <Button
                id="basic-button"
                sx={{ display: { xs: 'none', sm: 'block', color: 'rgb(85, 26, 139)' } }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Categories
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {data?.map((item: ICategories) => {
                    return <NestedMenuItem
                       key={item.name}
                        label={item.name}
                        parentMenuOpen={open}
                    >
                       {item.courses?.map(course => {
                           if(course.subCourse) {
                               return (
                                   <NestedMenuItem key={course.name} label={course.name} parentMenuOpen={open}>
                                       {course.subCourse.map(subCourse => (
                                               <MenuItem key={subCourse.name} onClick={handleClose}>
                                                   <Link style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}} href={'/courses'}>{subCourse.name}</Link>
                                               </MenuItem>))}
                                   </NestedMenuItem>)
                               }
                           else {
                               return (
                                   <MenuItem key={course.name} onClick={handleClose}>
                                       <Link style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}} href={'/courses'}>{course.name}</Link>
                                   </MenuItem>
                               )
                           }})}
                    </NestedMenuItem>
                })}
            </Menu>
        </div>
    );
}


