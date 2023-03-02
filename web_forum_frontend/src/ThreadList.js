import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ThreadList extends Component {

    constructor(props) {
        super(props);
        this.state = {threads: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/threads')
            .then(response => response.json())
            .then(data => this.setState({threads: data}));
    }

    async remove(id) {
        await fetch(`/api/thread/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedThreads = [...this.state.threads].filter(i => i.id !== id);
            this.setState({threads: updatedThreads});
        });
    }

    render() {
        const {threads} = this.state;

        const threadList = threads.map(thread => {
            return <tr key={thread.id}>
                <td>{thread.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{thread.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="success" tag={Link} to={"/api/posts/" + thread.id}>Posts</Button>
                        <Button size="sm" color="warning" tag={Link} to={"/api/thread/" + thread.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(thread.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/api/thread/new" style={{float: 'right'}}>Add Thread</Button>
                    </div>
                    <h3>Threads</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">ID</th>
                            <th width="80%">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {threadList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ThreadList;