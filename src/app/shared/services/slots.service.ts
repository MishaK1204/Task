import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ProviderI } from '../interfaces/slot-providers.interface'
import { CategoryI } from '../interfaces/slot-categories.interface'
import { map } from 'rxjs'
import { SlotsByProviderI } from '../interfaces/slots-by-provider.interface'

@Injectable({ providedIn: 'root' })
export class SlotsService {
    private http: HttpClient = inject(HttpClient)

    getCategories() {
        return this.http.get<{ data: CategoryI[] }>(
            `https://cms.crocobet.com/integrations/v2/slot/categories?include=games`
        )
    }

    getProviders() {
        return this.http.get<{ data: ProviderI[] }>(
            `https://cms.crocobet.com/integrations?type=slot&platform=desktop`
        )
    }

    getSlotsByProvider(provider: string) {
        this.http
            .get<SlotsByProviderI>(
                `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}`
            )
            .pipe(
                map((res) => {
                    return res.data.games
                })
            )
    }
}
