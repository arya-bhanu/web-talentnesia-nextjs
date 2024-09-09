'use client'
import React from "react";
import { HeroSection } from "./components/hero";
import {PopularCourses} from "./components/popular-bootcamp/PopularCourse";
import { BootcampViewProps } from "./bootcamp.type";
import {FeatureSection} from "./components/features-section";
import AllClass from "@/portal/components/all-class/AllClass";
import { courseDataArray } from "@/portal/components/course-card/courseCard.data";
import { filterCategories } from "@/portal/components/filter/filter.data";
import UserStoryCard from "@/portal/components/user-story-card";

const BootcampView: React.FC<BootcampViewProps> = ({ data, courses, isLoading }) => {

    return(
        <>
        <HeroSection isLoading={isLoading}/>
        <main className="container">
            <PopularCourses courses={courses.items} isLoading={isLoading} className="mb-16" />
        </main>
        <FeatureSection isLoading={isLoading}/>
        <main className="container">
            <AllClass courses={courseDataArray} filterOptions={filterCategories} isLoading={isLoading} title="Jelajahi Semua Bootcamp"/>
            <UserStoryCard 
                className="mt-16 md:mt-20 lg:mt-32"
                testimonials={data.testimonials || []}
                isLoading={isLoading}
            />
        </main>
        </>
    );
};

export default BootcampView;