import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PostEdit extends Component {

    emptyItem = {
        post: '',
        userName: '',
        threadId: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        if (this.props.match.params.id !== 'new') {
            const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
            this.setState({item: post});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/post' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/api/posts/' + item.threadId);
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Post' : 'Add Post'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="userName">User name</Label>
                        <Input type="text" name="userName" id="userName" value={item.userName || ''}
                               onChange={this.handleChange} autoComplete="userName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="post">Post</Label>
                        <Input type="text" name="post" id="post" value={item.post || ''}
                               onChange={this.handleChange} autoComplete="post"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="post">Thread ID</Label>
                        <Input type="text" name="threadId" id="threadId" value={item.threadId || ''}
                               onChange={this.handleChange} autoComplete="threadId"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/api/threads">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(PostEdit);