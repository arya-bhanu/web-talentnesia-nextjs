import React from "react";
import ElearningView  from "./elearning.view";
import { getHomeData } from "../home/hooks/getHomeData";

export const Elearning = async() => {
    try {
        const data = await getHomeData();
        return <ElearningView data={data} />
    } catch (error) {
        return <div>Error loading data...</div>
    }
    
};
