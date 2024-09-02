import React from "react";
import ElearningView  from "./elearning.view";
import homeApi from "../home/api/homeApi";

export const Elearning = async() => {
    try {
        const data = await homeApi();
        return <ElearningView data={data} />
    } catch (error) {
        return <div>Error loading data...</div>
    }
    
};
