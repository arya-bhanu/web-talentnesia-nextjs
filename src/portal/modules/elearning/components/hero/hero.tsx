import React from "react";
import clsx from 'clsx'
import { HeroSectionView } from "./hero.view";

export const HeroSection = ({ className, isLoading } : { className?: String, isLoading?: boolean}) => {
    return <HeroSectionView className={clsx(className)} isLoading={isLoading} />;
};