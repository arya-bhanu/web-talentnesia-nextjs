import React from "react";
import { FeatureSectionView } from "./feature.view";
import clsx from "clsx";

export const FeatureSection = ({className, isLoading} : {className?: string, isLoading?: boolean}) => {
    return <FeatureSectionView className={clsx(className)} isLoading={isLoading}/>;
};
