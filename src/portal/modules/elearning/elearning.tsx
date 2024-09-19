'use client';

import React, { useEffect, useState } from "react";
import ElearningView from "./elearning.view";
import elearningApi from "./api/elearningApi";

export const Elearning: React.FC = () => {
    const [data, setData] = useState<any>();
    const [courses, setCourses] = useState<any>();
    const [skeletonAnimation, setSkeleton] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await elearningApi();
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

    return <ElearningView data={data || { items: [], testimonials: [] }} courses={courses || []} isLoading={skeletonAnimation} />;
};
