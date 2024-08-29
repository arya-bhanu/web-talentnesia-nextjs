"use client";

import { useState } from 'react';
import StatisticView from './Statistic.view';
import { statisticData } from './statistic.data';

const Statistic = () => {
    const [isViewAll, setIsViewAll] = useState(false);

    const toggleViewAll = () => {
        setIsViewAll(!isViewAll);
    };

    return (
        <StatisticView
            statisticData={statisticData}
            isViewAll={isViewAll}
            toggleViewAll={toggleViewAll}
        />
    );
};

export default Statistic;


