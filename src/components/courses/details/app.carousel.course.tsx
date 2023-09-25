import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import {useCourseDetail} from "@/app/middleware";
import Image from "next/image";

export function CourseSlider(props: any)
{
    const { courseName} = props;
    const [data] = useCourseDetail(courseName);

    let items = [data, data, data]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props: any)
{
    return (
        <Paper>
            <h2>{props.item.title}</h2>
            <p>{props.item.description}</p>
            <Image src={`/courses/${props.item.image}`} width={'100'} height={'100'} alt={'course-image'}/>
            <br/>
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}