export interface ICoin {
  id: string
  priceUsd: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  rank: string
  marketCapUsd: string
  changePercent24Hr: string
}
export interface IResponse<T> {
  data: T
}
