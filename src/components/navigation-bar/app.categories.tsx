'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {NestedMenuItem} from 'mui-nested-menu';
import Link from "next/link";
import {useCategories} from "@/app/middleware";

export default function AppCategories() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {data, isLoading, error} = useCategories();
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    const categories: ICategories[] = data.data;

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                sx={{display: {xs: 'none', sm: 'block', color: 'rgb(85, 26, 139)'}}}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Categories
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {categories?.map((item: ICategories) => {
                    return <NestedMenuItem
                        key={item.categoryName}
                        label={item.categoryName}
                        parentMenuOpen={open}
                    >
                        {item.courses?.map(course =>
                            (
                                <MenuItem key={course.courseName} onClick={handleClose}>
                                    <Link style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}
                                          href={`/${item.categoryName}/course/${course.courseName}`}>{course.courseName}</Link>
                                </MenuItem>
                            ))
                        }
                    </NestedMenuItem>
                })}
            </Menu>
        </div>
    );
}


