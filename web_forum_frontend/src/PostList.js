import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    componentDidMount() {
        fetch(`/api/posts/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({posts: data}));
    }

    async remove(id) {
        await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPosts = [...this.state.posts].filter(i => i.id !== id);
            this.setState({posts: updatedPosts});
        });
    }

    render() {
        const {posts} = this.state;

        const postList = posts.map(post => {
            return <tr key={post.id}>
                <td style={{whiteSpace: 'nowrap'}}>{post.userName}</td>
                <td>{post.post}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="warning" tag={Link} to={{pathname: "/api/post/" + post.id, state: {threadId: this.props.match.params.id} }}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(post.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <div className="float-right">
                        <Button color="success" tag={Link} to="/api/post/new" style={{float: 'right'}}>Add Post</Button>
                    </div>
                    <h3>Posts</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">User</th>
                            <th width="90%">Post</th>
                        </tr>
                        </thead>
                        <tbody>
                        {postList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default PostList;