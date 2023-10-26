import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from "next/link";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CoursePagination from './app.pagination'
import { useCourses } from "@/app/middleware";
import {useEffect, useState} from "react";

interface IProps {
    categoryName: string
}

export default function CourseCards(props: IProps) {
    const { data, isLoading, error }  = useCourses();
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    let courses = data.data

    if(props.categoryName !== 'all') {
        console.log(props.categoryName)
        courses = courses.filter(item => props.categoryName == item.category.categoryName.toLowerCase())
    }
    return (
        <div>
            <div>
                <CoursePagination />
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {courses.map(course => (
                        <Grid key={course.courseName} item xs={4}>
                            <Card sx={{Width: 345, Height: 400}}>
                                <CardMedia
                                    sx={{height: 180}}
                                    image={`http://localhost:4000/images/${course.image}`}
                                    title={course.courseName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.courseName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button>
                                        <Link style={{'textDecoration': 'none'}} href={`/courses/${(course.category.categoryName).toLowerCase()}/${(course.courseName).toLowerCase()}`}>
                                            Enroll Now
                                        </Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}