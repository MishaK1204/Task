import { GameI } from './game.interface'

interface Data {
    type: string
    provider: string
    vendor: string
    iframeW: number
    iframeH: number
    name: string
    order: number
    tags: string[]
    games: GameI[]
    totalGames: number
}

export interface SlotsByProviderI {
    data: Data
}
