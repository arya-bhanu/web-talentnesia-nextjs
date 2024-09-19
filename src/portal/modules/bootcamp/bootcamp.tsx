'use client'

import React, { useEffect, useState } from "react";
import BootcampView from "./bootcamp.view";
import bootcampApi from "./api/bootcampApi";

export const Bootcamp: React.FC = () => {
    const [data, setData] = useState<any>();
    const [courses, setCourses] = useState<any>();
    const [skeletonAnimation, setSkeleton] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bootcampApi();
                setData(result);
                setCourses(result.items);
                setTimeout(() => {
                    setSkeleton(false);
                }, 500);
            } catch (err) {
                setTimeout(() => {
                    setSkeleton(false);
                }, 500);
                console.error('Error loading data:', err);
            }
        };

        fetchData();
    }, []);

    return <BootcampView data={data || { items: [], testimonials: [] }} courses={courses || []} isLoading={skeletonAnimation} />;
};
