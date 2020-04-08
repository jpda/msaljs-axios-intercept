import { UserAgentApplication, AuthResponse, AuthError } from 'msal';

interface IRequestConfiguration {
    scopes: string[];
    state?: string;
}

export default class MsalHandler {
    msalObj: UserAgentApplication;
    redirect: boolean;

    static instance: MsalHandler;
    static createInstance() {
        var a = new MsalHandler();
        return a;
    }

    static getInstance() {
        if(!this.instance){
            this.instance = this.createInstance();
        }
        return this.instance;
    }

    private requestConfiguration: IRequestConfiguration = {
        scopes: ["api://msaljs.jpda.app/power", "api://msaljs.jpda.app/wake"],
    };

    constructor() {
        this.redirect = true;
        console.warn("MsalHandler::ctor: starting");
        const a = new UserAgentApplication({
            auth: {
                clientId: "31c0ca04-16fb-49b6-83a2-e8c8487ea4fd",
                authority: "https://login.microsoftonline.com/98a34a88-7940-40e8-af71-913452037f31",
                redirectUri: "http://localhost:3000/auth",
                navigateToLoginRequestUrl: false
            },
            cache: {
                cacheLocation: "sessionStorage" // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
            }
        });

        console.warn("MsalHandler::ctor: setting redirect callbacks");
        a.handleRedirectCallback(t => this.processLogin, e => { console.error(e); });
        this.msalObj = a;
    }

    async login(redirect?: boolean, state?: string, scopes?: string[]) {
        console.warn("MsalHandler::login: entering login; scopes: " + scopes + ", state: " + state + ", redirect: " + redirect);
        if (state) {
            console.warn("MsalHandler::login: Setting state to: " + state);
            this.requestConfiguration.state = state;
        }
        if (redirect || this.redirect) {
            console.warn("MsalHandler::login: redirecting to login with parameters: " + JSON.stringify(this.requestConfiguration));
            this.msalObj.loginRedirect(this.requestConfiguration);
        } else {
            try {
                console.warn("MsalHandler::login: logging in with popup, config: " + JSON.stringify(this.requestConfiguration));
                var response = await this.msalObj.loginPopup(this.requestConfiguration);
                console.warn("MsalHandler::login: got something: " + JSON.stringify(response));
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
            console.warn("MsalHandler::acquireAccessToken: access token silent: " + JSON.stringify(this.requestConfiguration));
            var token = await this.msalObj.acquireTokenSilent(this.requestConfiguration);
            return token.accessToken;
        } catch (e) {
            if (e instanceof AuthError) {
                console.error("MsalHandler::acquireAccessToken: error: " + JSON.stringify(e));
                if (e.errorCode === "user_login_error" || e.errorCode === "consent_required" || e.errorCode === "interaction_required") { // todo: check for other error codes
                    this.login(redirect, state, this.requestConfiguration.scopes);
                }
            }
            console.error(e);
        }
        return null;
    }

    async getUserData() {

    }

    processLogin(t: AuthResponse) {
        console.log("MsalHandler::processLogin: id_token received: " + t.idToken);
        console.log("MsalHandler::processLogin:access_token received: " + t.accessToken);
        console.log("MsalHandler::processLogin: state received: " + t.accountState);
    }
}