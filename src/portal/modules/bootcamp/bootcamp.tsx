'use client'

import React, { useEffect, useState } from "react";
import BootcampView from "./bootcamp.view";
import homeApi from "../home/api/homeApi";

export const Bootcamp: React.FC = () => {
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

    return <BootcampView data={data || []} />;
};
