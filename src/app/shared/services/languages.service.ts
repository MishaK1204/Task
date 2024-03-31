import { inject, Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({ providedIn: 'root' })
export class LanguagesService {
    private translateService = inject(TranslateService)

    get currentLanguage() {
        return localStorage.getItem('currentLanguage')
    }

    constructor() {
        this.currentLanguage || localStorage.setItem('currentLanguage', 'ge')
        this.translateService.use(this.currentLanguage as string)
    }

    changeLanguage(code: string) {
        this.translateService.use(code)
        localStorage.setItem('currentLanguage', code)
    }
}
