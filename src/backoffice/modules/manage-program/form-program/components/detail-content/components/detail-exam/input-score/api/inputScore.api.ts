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