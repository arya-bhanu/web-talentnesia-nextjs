import React from "react";
import BootcampView from "./bootcamp.view";
import { getHomeData } from "../home/hooks/getHomeData";

export const Bootcamp = async() => {
    try {
        const data = await getHomeData();
        return <BootcampView data={data} />
    } catch (error) {
        return <div>Error loading data...</div>
    }
    
};
