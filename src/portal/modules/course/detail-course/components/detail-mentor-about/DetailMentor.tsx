import React from 'react'
import DetailMentorview from './DetailMentor.view'
import { Mentor } from './detailMentor.type'


const DetailMentor = ({ mentor }: { mentor: Mentor }) => {
  return (
    <>
    <div>

      <DetailMentorview mentor={mentor} />
    </div>
    </>
  )
}

export default DetailMentor
