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

export default function CourseCards() {
    const { data, isLoading, error }  = useCourses();
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    console.log("data", data.map(course => console.log(course)))
    return (
        <div>
            <div>
                <CoursePagination />
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {data.map(course => (
                        <Grid key={course.courseName} item xs={4}>
                            <Card sx={{Width: 345, Height: 400}}>
                                <CardMedia
                                    sx={{height: 180}}
                                    image={`/courses/${course.image}`}
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
                                        <Link style={{'textDecoration': 'none'}} href={`/${course.category.categoryName}/course/${course.courseName}`}>
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