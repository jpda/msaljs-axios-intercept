import { UserAgentApplication, AuthResponse, AuthError } from 'msal';

interface IRequestConfiguration {
    scopes: string[];
    state?: string;
}

export default class MsalHandler {
    msalObj: UserAgentApplication;
    redirect: boolean;

    private requestConfiguration: IRequestConfiguration = {
        scopes: ["api://msaljs.jpda.app/power", "api://msaljs.jpda.app/wake"],
    };

    constructor() {
        this.redirect = true;
        const a = new UserAgentApplication({
            auth: {
                clientId: "31c0ca04-16fb-49b6-83a2-e8c8487ea4fd",
                authority: "https://login.microsoftonline.com/98a34a88-7940-40e8-af71-913452037f31",
                redirectUri: "http://localhost:3000/auth"
            },
            cache: {
                cacheLocation: "sessionStorage" // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
            }
        });

        a.handleRedirectCallback(t => this.processLogin, e => { console.error(e); });
        this.msalObj = a;
    }

    async login(redirect?: boolean, state?: string, scopes?: string[]) {
        console.warn("entering login; scopes: " + scopes + ", state: " + state + ", redirect: " + redirect);
        if (state) {
            console.warn("Setting state to: " + state);
            this.requestConfiguration.state = state;
        }
        if (redirect || this.redirect) {
            console.warn("redirecting to login with parameters: " + JSON.stringify(this.requestConfiguration));
            this.msalObj.loginRedirect(this.requestConfiguration);
        } else {
            try {
                console.warn("logging in with popup, config: " + JSON.stringify(this.requestConfiguration));
                var response = await this.msalObj.loginPopup(this.requestConfiguration);
                console.warn("got something: " + JSON.stringify(response));
                this.processLogin(response);
            } catch (e) {
                console.error(e);
            }
        }
    }

    async acquireAccessToken(redirect?: boolean, state?: string, scopes?: string[]): Promise<String | null> {
        if (scopes) {
            this.requestConfiguration.scopes = scopes;
        }
        try {
            console.warn("access token silent: " + JSON.stringify(this.requestConfiguration));
            var token = await this.msalObj.acquireTokenSilent(this.requestConfiguration);
            return token.accessToken;
        } catch (e) {
            if (e instanceof AuthError) {
                console.error(JSON.stringify(e));
                if (e.errorCode === "user_login_error" || e.errorCode === "consent_required" || e.errorCode === "interaction_required") { // todo: check for other error codes
                    this.login(redirect, state, this.requestConfiguration.scopes);
                }
            }
            console.error(e);
        }
        return null;
    }

    private processLogin(t: AuthResponse) {
        console.warn("entering MsalHandler::login");
        console.log("id_token received: " + t.idToken);
        console.log("access_token received: " + t.accessToken);
        console.log("state received: " + t.accountState);
    }
}