interface ImageSet {
    blurhash: string | null
    original: string
    webp: string
}

interface Game {
    game_id: string
    name: string
    provider: string
    providerName: string
    image: string
    url: string
    order: number
    tags: string[]
    stats: any[]
    favoriteCount: number
    imageSet: ImageSet
    remoteId: string
    gameId: string
    image2: string
}

export interface CategoryI {
    type: string
    category: string
    platform: string
    name: string
    order: number
    games: Game[]
    totalGames: number
}
