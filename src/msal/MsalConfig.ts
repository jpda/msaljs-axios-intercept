const MsalConfig = {
    config: {
        // aad configuration
        // auth: {
        //     clientId: "31c0ca04-16fb-49b6-83a2-e8c8487ea4fd",
        //     authority: "https://login.microsoftonline.com/98a34a88-7940-40e8-af71-913452037f31/v2.0",
        //     redirectUri: "https://msaljs-axios.jpda.app/auth",
        //     navigateToLoginRequestUrl: false
        // },

        // b2c configuration
        auth: {
            clientId: "5db7bd2a-1c59-40de-b638-2bd0b07a358d",
            authority: "https://jpdab2c.b2clogin.com/jpdab2c.onmicrosoft.com/B2C_1_susi_v2",
            redirectUri: "https://msaljs-axios.jpda.app/auth",
            navigateToLoginRequestUrl: false,
            validateAuthority: false
        },
        cache: {
            cacheLocation: "sessionStorage" // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
        } as const
    },
    // this is marked as the default, as the scopes for individual pages may be different
    defaultRequestConfiguration: {
        // aad scopes
        // scopes: ["api://msaljs.jpda.app/power", "api://msaljs.jpda.app/wake"],

        // b2c api scopes
        scopes: ["https://jpdab2c.onmicrosoft.com/msaljs-axios-api/stuff.read", "https://jpdab2c.onmicrosoft.com/msaljs-axios-api/otherstuff.execute"]
    }
}
export default MsalConfig;