'use client';

import React, { useEffect, useState } from "react";
import ElearningView from "./elearning.view";
import homeApi from "../home/api/homeApi";

import elearningApi from "./api/elearningApi";

export const Elearning: React.FC = () => {
    const [data, setData] = useState<any>();
    const [course, setCourse] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [skeletonAnimation, setSkeleton] = useState(true);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const result = await homeApi();
                const course = await elearningApi();
                setCourse(course);
                setData(result);
                setTimeout(() => {
                    setSkeleton(false);
                }, 500);
            } catch (err) {
                setError('Error loading data...');
                setTimeout(() => {
                    setSkeleton(false);
                }, 500);
            }
        };

        fetchData();
        
    }, []);

    

    if (error) {
        return <div>{error}</div>; 
    }

    return <ElearningView data={data || []} courses={course || []} isLoading={skeletonAnimation} />;
};
