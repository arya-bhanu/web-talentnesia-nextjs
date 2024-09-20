import React from 'react'
import DetailMentorview from './DetailMentor.view'


const DetailMentor = ({ mentor }: { mentor: any }) => {
  return (
    <>
    <div>

      <DetailMentorview mentor={mentor} />
    </div>
    </>
  )
}

export default DetailMentor
