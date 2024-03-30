import { GameI } from './game.interface'

export interface CategoryI {
    type: string
    category: string
    platform: string
    name: string
    order: number
    games: GameI[]
    totalGames: number
}
