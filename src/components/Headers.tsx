import React from 'react';
import API from '../api';

class RequestValue {
    key: any;
    value: any;
}

export default class Headers extends React.Component {
    state = {
        headers: Array<RequestValue>()
    }

    componentDidMount() {
        API.get(`headers`)
            .then(res => {
                const headers = res.data;
                this.setState({ headers });
            })
    }

    render() {
        return (
            <div>
                <h1>Headers received by server</h1>
                <table>
                    <thead>
                        <tr>
                            <th>key</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.headers.map((x, i) => <tr key={i}><td>{x.key}</td><td>{x.value.length > 100 ? x.value.substring(0, 100) + ".../snip" : x.value}</td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}