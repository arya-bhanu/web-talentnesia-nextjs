import React, { CSSProperties } from "react";

export interface SkeletonProps {
    visible: boolean;
    variant?: 'text' | 'image' | 'video' | 'circle-image' | 'circle-video' | 'avatar';
    width?: number | string;
    height?: number | string;
    containerStyle?: CSSProperties;
}