'use client'

import React, { useEffect, useState } from "react";
import BootcampView from "./bootcamp.view";
import homeApi from "../home/api/homeApi";
import courseApi from "../course/api/course";

export const Bootcamp: React.FC = () => {
    const [data, setData] = useState<any>();
    const [course, setCourse] = useState<any>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await homeApi();
                const course = await courseApi();
                setCourse(course);
                setData(result);
            } catch (err) {
                console.error(err);
                setError('Error loading data...');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return <BootcampView data={data || []} courses={course || []}/>;
};
