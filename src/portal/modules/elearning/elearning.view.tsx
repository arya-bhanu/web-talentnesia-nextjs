'use client'
import React from "react";
import { HeroSection } from "./components/hero";
import {PopularCourses} from "./components/popular-course/PopularCourse";
import { ElearningViewProps } from "./elearning.type";
import {FeatureSection} from "./components/features-section";
import AllClass from "@/portal/components/all-class/AllClass";
import { courseDataArray } from "@/portal/components/course-card/courseCard.data";
import { filterCategories } from "@/portal/components/filter/filter.data";
import UserStoryCard from "@/portal/components/user-story-card";

const ElearningView: React.FC<ElearningViewProps> = ({ data, courses, isLoading }) => {

    return(
        <>
        <HeroSection isLoading={isLoading}/>
        <main className="container">
        <PopularCourses courses={courses} className="mb-16" isLoading={isLoading} />
        </main>
        <FeatureSection isLoading={isLoading}/>
        <main className="container">
            <AllClass courses={courses} filterOptions={filterCategories} isLoading={isLoading} title="Jelajahi Semua Course"/>
            <UserStoryCard 
                className="mt-16 md:mt-20 lg:mt-32"
                testimonials={data.testimonials || []}
                isLoading={isLoading}
            />
        </main>
        </>
    );
};

export default ElearningView;