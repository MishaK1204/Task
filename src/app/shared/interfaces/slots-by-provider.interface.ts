interface GameImageSet {
    blurhash: string
    original: string
    webp: string
}

interface Game {
    game_id: string
    name: string
    provider: string
    image: string
    imageSet: GameImageSet
    url: string
    order: number
    tags: string[]
    stats: any[] // Assuming stats can be any type
    gameId: string
    image2: string
}

interface Data {
    type: string
    provider: string
    vendor: string
    iframeW: number
    iframeH: number
    name: string
    order: number
    tags: string[]
    games: Game[]
    totalGames: number
}

export interface SlotsByProviderI {
    data: Data
}
