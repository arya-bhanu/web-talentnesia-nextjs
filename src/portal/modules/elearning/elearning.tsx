'use client';

import React, { useEffect, useState } from "react";
import ElearningView from "./elearning.view";
import homeApi from "../home/api/homeApi";

export const Elearning: React.FC = () => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await homeApi();
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

    return <ElearningView data={data || []} />;
};
