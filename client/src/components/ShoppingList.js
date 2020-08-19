import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types';

class ShoppingList extends Component{
    componentDidMount(){
        this.props.getItems();
    }
    onDelete = (_id)=>{
        this.props.deleteItem(_id);
    }
    render(){
        const {items} = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map( ({_id, name})=> (
                            <CSSTransition key={_id} timeout={300} classNames='fade'>
                                <ListGroupItem>
                                    <Button className='remove-btn' color='danger' size='sm' onClick={ this.onDelete.bind(this, _id)}> 
                                        &times;
                                    </Button>
                                    {name}  
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propType = {
    getItems : PropTypes.func.isRequered,
    item     : PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    item: state.item
})
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);