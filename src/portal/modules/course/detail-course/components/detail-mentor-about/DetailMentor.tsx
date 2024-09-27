import React from 'react'
import DetailMentorview from './DetailMentor.view'
import { CoursesData, Mentor } from './detailMentor.type'



const DetailMentor = ({ mentor, courses, isLoading, data }: { mentor: Mentor; courses: any[]; isLoading: boolean; data: CoursesData }) => {
  return (
    <>
    <div>
      <DetailMentorview mentor={mentor} courses={courses} isLoading={isLoading} data={data} />
    </div>
    </>
  )
}

export default DetailMentor
