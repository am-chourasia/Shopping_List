import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();                                          // fetching the items as the components mount
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }
    onDelete = (_id) => {                                               // Requesting to delete item when delete button is clicked
        this.props.deleteItem(_id);                                         
    }
    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name, username }) => (
                            <CSSTransition key={_id} timeout={300} classNames='fade'>
                                <ListGroupItem>
                                    <Row>
                                        <Col xs="1">
                                            {this.props.isAuthenticated === true ?          // Show the delete button only if the user is authenticated
                                                <Button className='remove-btn' color='danger' size='sm' onClick={this.onDelete.bind(this, _id)}>
                                                    &times;
                                                    </Button> :
                                                null
                                            }
                                        </Col>
                                        <Col xs="8">
                                            {name}
                                        </Col>
                                        <Col className="ml-auto text-muted">
                                            <span>Added by: {username}</span>               {/* Showing the userStamp of the item */}
                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </CSSTransition>
                        ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);