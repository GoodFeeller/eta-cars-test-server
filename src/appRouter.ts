import coinRouter from './coin-api/coin-router'
import historyRouter from './history-api/history-router'
import { router } from './trpc'

const appRouter = router({
  coin: coinRouter,
  history: historyRouter
})

export type appRouterType = typeof appRouter
export default appRouter
