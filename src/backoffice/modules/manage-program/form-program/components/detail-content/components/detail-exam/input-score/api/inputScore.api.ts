import { fetchAxios } from "@/lib/fetchAxios"

export const fetchScore = async (contentId: string | null) => {
  if (contentId) {
    const response = await fetchAxios({
      url: `/v1/program-exam/input-nilai/${contentId}`,
      method: 'GET',
    })
    return response
  }
}

export const inputScore = async (payload: {
  contentId: string;
  userId: string;
  scores: Array<{
    questionId: string;
    answerId: string | null;
    score: number;
  }>;
}) => {
  const response = await fetchAxios({
    url: `/v1/program-exam/input-score`,
    method: 'POST',
    formData: {
      ...payload,
      scores: payload.scores.map(score => ({
        ...score,
        answerId: score.answerId || '-'
      }))
    }
  })
  console.log(response)
  return response
}
