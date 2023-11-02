import axios, { type AxiosResponse } from 'axios'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { type IResponse } from '../types/coin'
import { type IHistory } from '../types/history'
const baseUrl = 'https://api.coincap.io/v2/assets'
const historyArrOutput = publicProcedure.output((value) => {
  const arr: IHistory[] = []
  if (typeof arr === typeof value) return value
  else throw new Error('Output validate error!')
})

const historyRouter = router({
  getHistory: historyArrOutput.input(z.object({
    id: z.string(),
    interval: z.string()
  })).query(async (opts) => {
    const { id, interval } = opts.input
    const response: AxiosResponse<IResponse<IHistory[]>> = await axios.get(
        `${baseUrl}/${id}/history?interval=${interval}`
    )
    return response.data.data
  })

})

export default historyRouter
