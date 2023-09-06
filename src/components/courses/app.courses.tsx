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
import {useContext} from "react";
import { CourseContext } from "@/app/courses/courseContext";

export default function CourseCards() {
    // @ts-ignore
    const { data } = useContext(CourseContext);
    return (
        <div>
            <div>
                <CoursePagination />
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {data.map(course => (
                        <Grid key={course.title} item xs={4}>
                            <Card sx={{Width: 345, Height: 400}}>
                                <CardMedia
                                    sx={{height: 180}}
                                    image={`/courses/${course.image}`}
                                    title={course.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button>
                                        <Link style={{'textDecoration': 'none'}} href={`/courses/${course.path}`}>
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
