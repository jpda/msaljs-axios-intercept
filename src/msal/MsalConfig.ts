import IRequestConfiguration from "./IRequestConfiguration"

export default class MsalConfig {
    static config: {
        auth: {
            clientId: "31c0ca04-16fb-49b6-83a2-e8c8487ea4fd",
            authority: "https://login.microsoftonline.com/98a34a88-7940-40e8-af71-913452037f31",
            redirectUri: "http://localhost:3000/auth",
            navigateToLoginRequestUrl: false
        },
        cache: {
            cacheLocation: "sessionStorage" // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
        }
    }
    // this is marked as the default, as the scopes for individual pages may be different
    static defaultRequestConfiguration: IRequestConfiguration = {
        scopes: ["api://msaljs.jpda.app/power", "api://msaljs.jpda.app/wake"],
    }
}