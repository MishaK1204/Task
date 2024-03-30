import { inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ProviderI } from '../interfaces/slot-providers.interface'
import { CategoryI } from '../interfaces/slot-categories.interface'
import { map, tap } from 'rxjs'
import { SlotsByProviderI } from '../interfaces/slots-by-provider.interface'
import { GameI } from '../interfaces/game.interface'

@Injectable({ providedIn: 'root' })
export class SlotsService {
    private http: HttpClient = inject(HttpClient)

    games = signal<GameI[] | null>(null)
    totalGames = signal<Map<string, number> | null>(null)
    currentFilter = signal<string>('')

    getProviders() {
        return this.http.get<{ data: ProviderI[] }>(
            `https://cms.crocobet.com/integrations?type=slot&platform=desktop`
        )
    }

    getCategoryTotalGames() {
        const desktopCategories = [
            'web:popular',
            'web:favorites',
            'web:new_games',
            'web:buy_bonus',
            'web:history',
        ]
        const desktopCategoriesTotalGames = new Map()

        return this.http
            .get<{
                data: CategoryI[]
            }>(
                `https://cms.crocobet.com/integrations/v2/slot/categories?include=games`
            )
            .pipe(
                tap((res) => {
                    res.data.forEach((category) => {
                        if (desktopCategories.includes(category.category)) {
                            desktopCategoriesTotalGames.set(
                                category.category,
                                category.totalGames
                            )
                        }
                    })

                    this.totalGames.set(desktopCategoriesTotalGames)
                })
            )
    }

    getSlotsByProvider(provider: string) {
        this.games.set(null)
        this.currentFilter.set(provider)

        return this.http
            .get<SlotsByProviderI>(
                `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}`
            )
            .pipe(
                tap((res) => {
                    this.games.set(res.data.games)
                })
            )
    }

    getSlotsByCategory(category: string) {
        this.games.set(null)
        this.currentFilter.set(category)

        return this.http
            .get<{
                data: CategoryI[]
            }>(
                `https://cms.crocobet.com/integrations/v2/slot/categories?include=games`
            )
            .pipe(
                map((res) => {
                    return (
                        res.data.filter((item) => item.category === category)[0]
                            ?.games ?? []
                    )
                }),
                tap((res) => {
                    this.games.set(res)
                })
            )
    }
}
