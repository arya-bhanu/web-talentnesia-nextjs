import React from "react";
import { SkeletonProps } from "./skeleton.type";
import SkeletonView from "./Skeleton.view";
import { styleText } from "util";

const SkeletonLoader: React.FC<SkeletonProps> = ({
    variant,
    visible,
    width,
    height,
    containerStyle,
}) => {
    return(
        <SkeletonView variant={variant} visible={visible}
        width={width} height={height} containerStyle={containerStyle}/>
    );

};
export default SkeletonLoader;