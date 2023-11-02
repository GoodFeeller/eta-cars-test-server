import axios, { type AxiosResponse } from 'axios'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { type IResponse, type ICoin } from '../types/coin'
const baseUrl = 'https://api.coincap.io/v2/assets'
const coinArrOutput = publicProcedure.output((value) => {
  const arr: ICoin[] = []
  if (typeof arr === typeof value) return value
  else throw new Error('Output validate error!')
})

const coinRouter = router({
  getAll: coinArrOutput.input(z.number()).query(async ({ input }) => {
    const response: AxiosResponse<IResponse<ICoin[]>> = await axios.get(
        `${baseUrl}?limit=20&offset=${(input - 1) * 20}`
    )
    return response.data.data
  }),
  search: coinArrOutput.input(z.object({
    searchStr: z.string(),
    page: z.number()
  })).query(async (opts) => {
    const { page, searchStr } = opts.input
    const response: AxiosResponse<IResponse<ICoin[]>> = await axios.get(
      `${baseUrl}?search=${searchStr}&limit=20&offset=${(page - 1) * 20}`
    )
    return response.data.data
  }),
  getCoin: publicProcedure.input(z.string()).query(async ({ input }) => {
    const response: AxiosResponse<IResponse<ICoin>> = await axios.get(
      `${baseUrl}/${input}`
    )
    return response.data.data
  }),
  getPopularCoins: coinArrOutput.query(async () => {
    const response: AxiosResponse<IResponse<ICoin[]>> = await axios.get(
      `${baseUrl}?limit=3`
    )
    return response.data.data
  })

})

export default coinRouter
