export interface GameI {
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

interface ImageSet {
    blurhash: string | null
    original: string
    webp: string
}
