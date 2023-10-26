'use client'

import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import { useCourseDetails} from "@/app/middleware";
import axios from 'axios';
import Image from "next/image";
import KintoneImage from "@/components/app.image";

interface IProps {
    courseName: string
}

const style = {
    background: 'linear-gradient(90deg, #1976d2 25%, #fff 100%)',
    height: '40vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
}
export default function CourseDetails(props: IProps) {
    const { courseName} = props;
    const { data, isLoading, error} = useCourseDetails(courseName);
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    let trainerName = "";
    if(data[0].instructor){
        trainerName = `${data[0].instructor.firstName} ${data[0].instructor.lastName}`
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }} style={style}>
                <Grid container spacing={2}><Grid item xs={2}>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ color: '#fff', fontSize: '48px', lineHeight: 1.25}}> {data[0].courseName} </Typography>
                        <Typography>Tổng Quan</Typography>
                        <Typography>
                            Trainer:	&nbsp;
                            <label>{trainerName}</label>
                        </Typography>
                        <Typography>
                            Thời gian:	&nbsp;
                            <label>4h</label>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <KintoneImage fileKey={data[0].image}/>
                        <div>
                            <Typography>
                                Examination: &nbsp;
                                <Button>Start</Button>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Box>
        </>
    );
}
