'use client'

import React, { useEffect, useState } from "react";
import BootcampView from "./bootcamp.view";
import homeApi from "../home/api/homeApi";
import courseApi from "../course/api/course";
import bootcampApi from "./api/bootcampApi";

export const Bootcamp: React.FC = () => {
    const [data, setData] = useState<any>();
    const [course, setCourse] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [skeletonAnimation, setSkeleton] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await homeApi();
                const course = await bootcampApi();
                setCourse(course);
                setData(result);
                setTimeout(() => {
                    setSkeleton(false)
                }, 500);
            } catch (err) {
                setTimeout(() => {
                    setSkeleton(false)
                }, 500);
                setError('Error loading data...');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return <BootcampView data={data || []} courses={course || []} isLoading={skeletonAnimation}/>;
};
