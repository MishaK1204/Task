import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter, RouterModule } from '@angular/router'

import { routes } from './app.routes'
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http)
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        importProvidersFrom(
            RouterModule.forRoot(routes),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
    ],
}
