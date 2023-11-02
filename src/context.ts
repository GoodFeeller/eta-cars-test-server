import { type inferAsyncReturnType } from '@trpc/server'
import type * as trpcExpress from '@trpc/server/adapters/express'

const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>
export default createContext
