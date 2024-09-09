'use client';

import React, { useEffect, useState } from "react";
import ElearningView from "./elearning.view";
import homeApi from "../home/api/homeApi";
import courseApi from "../course/api/course";

export const Elearning: React.FC = () => {
    const [data, setData] = useState<any>();
    const [course, setCourse] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [skeletonAnimation, setSkeleton] = useState(true);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const result = await homeApi();
                const course = await courseApi();
                setCourse(course);
                setData(result);
                setTimeout(() => {
                    setSkeleton(false);
                }, 500);
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

    return <ElearningView data={data || []} courses={course || []} isLoading={skeletonAnimation} />;
};
