import React from 'react';
import MsalHandler from '../MsalHandler';

export class Claim {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export default class Auth extends React.Component {
    msalHandler: MsalHandler;
    accountAvailable: boolean;

    constructor(props: any) {
        super(props);
        this.msalHandler = MsalHandler.getInstance(); // note this returns the previously instantiated MsalHandler
        this.handleClick = this.handleClick.bind(this);
        this.accountAvailable = false;
    }

    state = {
        claims: Array<Claim>(),
    }

    componentDidMount() {
        var account = this.msalHandler.msalObj.getAccount();
        if (account) {
            this.accountAvailable = true;
        }
        if (this.accountAvailable) {
            this.parseToken(this.msalHandler.msalObj.getAccount().idToken);
        }
        else { }
    }

    parseToken(token: any) {
        var claimData = Object.keys(token).filter(y => y !== "decodedIdToken" && y !== "rawIdToken").map(x => {
            return new Claim(x, Array.isArray(token[x]) ? token[x].join(",") : token[x].toString());
        });
        this.setState({ claims: claimData });
    }

    render() {
        if (this.accountAvailable) {
            return (
                <div>
                    <h1>User claims</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>key</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.claims.map((x, i) => <tr key={i}><td>{x.key}</td><td>{x.value.length > 75 ? x.value.substring(0, 75) + ".../snip" : x.value}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.handleClick}>login</button>
                </div>
            )
        }
    }

    async handleClick(e: any) {
        e.preventDefault();
        console.log("clicked");
        await this.msalHandler.login();
    }
}