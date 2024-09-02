import React from "react";
import BootcampView from "./bootcamp.view";
import homeApi from "../home/api/homeApi";

export const Bootcamp = async() => {
    try {
        const data = await homeApi();
        return <BootcampView data={data} />
    } catch (error) {
        return <div>Error loading data...</div>
    }
    
};
