import { UserAgentApplication, AuthResponse, AuthError } from 'msal';

interface IRequestConfiguration {
    scopes: string[];
    state?: string;
}

class UserInfo {
    accountAvailable: boolean;
    displayName: string;
    constructor() {
        this.displayName = "";
        this.accountAvailable = false;
    }
}

export default class MsalHandler {
    msalObj: UserAgentApplication;
    redirect: boolean;
    useStackLogging: boolean;

    // for handling a single instance of the handler, use getInstance() elsewhere
    static instance: MsalHandler;
    private static createInstance() {
        var a = new MsalHandler();
        return a;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = this.createInstance();
        }
        return this.instance;
    }

    private requestConfiguration: IRequestConfiguration = {
        scopes: ["api://msaljs.jpda.app/power", "api://msaljs.jpda.app/wake"],
    };

    // we want this private to prevent any external callers from directly instantiating, instead rely on getInstance()
    private constructor() {
        this.redirect = true;
        this.useStackLogging = false;
        this.track("ctor: starting");
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

        this.track("ctor: setting redirect callbacks");
        a.handleRedirectCallback((error, response) => {
            this.track("redirectCallback");
            if (response) {
                this.processLogin(response);
            }
            if (error) {
                console.error(error);
            }
        });
        this.msalObj = a;
    }

    public async login(redirect?: boolean, state?: string, scopes?: string[]) {
        this.track("entering login; scopes: " + scopes + ", state: " + state + ", redirect: " + redirect);
        if (state) {
            this.track("Setting state to: " + state);
            this.requestConfiguration.state = state;
        }
        if (redirect || this.redirect) {
            this.track("redirecting to login with parameters: " + JSON.stringify(this.requestConfiguration));
            this.msalObj.loginRedirect(this.requestConfiguration);
        } else {
            try {
                this.track("logging in with popup, config: " + JSON.stringify(this.requestConfiguration));
                var response = await this.msalObj.loginPopup(this.requestConfiguration);
                this.track("MsalHandler::login: got something: " + JSON.stringify(response));
                this.processLogin(response);
            } catch (e) {
                console.error(e);
            }
        }
    }

    public async acquireAccessToken(state?: string, redirect?: boolean, scopes?: string[]): Promise<String | null> {
        if (scopes) {
            this.requestConfiguration.scopes = scopes;
        }
        if (state) {
            this.track("state: " + state);
            this.requestConfiguration.state = state;
        }
        try {
            this.track("access token silent: " + JSON.stringify(this.requestConfiguration));
            var token = await this.msalObj.acquireTokenSilent(this.requestConfiguration);
            return token.accessToken;
        } catch (e) {
            if (e instanceof AuthError) {
                console.error("acquireAccessToken: error: " + JSON.stringify(e));
                if (e.errorCode === "user_login_error" || e.errorCode === "consent_required" || e.errorCode === "interaction_required") { // todo: check for other error codes
                    this.login(redirect, state, this.requestConfiguration.scopes);
                }
            }
            console.error(e);
        }
        return null;
    }

    public getUserData(): UserInfo {
        var account = this.msalObj.getAccount();
        var u = new UserInfo();
        if (account) {
            u.accountAvailable = true;
            u.displayName = account.name;
        }
        return u;
    }

    public processLogin(response: AuthResponse | undefined) {
        this.track("processLogin");
        if (!response) return;
        this.track("id_token received: " + response.idToken);
        this.track("access_token received: " + response.accessToken);
        this.track("state received: " + response.accountState);

        if (response.accountState) { // we had a redirect from another place in the app before the authentication request
            this.track("got a " + response.accountState);
            window.location.pathname = response.accountState;
        }
    }

    private track(message: string) {
        // lol: this is ridiculous - make sure you turn this off with this.useStackLogging = false
        var msg = "MsalHandler::" + message;
        if (this.useStackLogging) {
            var e = new Error("ok");
            var stack = e.stack?.split("\n")[2].trim();
            var start = stack?.indexOf("(");
            var prefix = msg?.substring(3, start).trim();
            console.debug(prefix + message);
        }
        else {
            console.log(msg);
        }
    }
}