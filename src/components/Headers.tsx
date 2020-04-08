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
            <table>
                <thead>
                    <tr>
                        <th>key</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.headers.map((x, i) => <tr key={i}><td>{x.key}</td><td>{x.value}</td></tr>)}
                </tbody>
            </table>
    )
    }
}