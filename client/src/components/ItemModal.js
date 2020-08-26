import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends React.Component {
    state = {
        modal: false,                                             // is the modal open
        name: ''
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,                          //is the user authenticated
        auth: PropTypes.object.isRequired                         //for displaying the username who inserted the item into the list
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name,
            username: this.props.auth.user.name
        }
        this.props.addItem(newItem);
        this.toggle();                                           //closing the modal after making the post request
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ?                   // If authenticated show the Add Item button else request to log in 
                    <Button color="dark" style={{ marginBottom: '2rem', marginLeft: '1rem' }} onClick={this.toggle}>
                        Add Item
                    </Button> :
                    <h4 className='mb-3 ml-4'> Please Login to add or delete item</h4>
                }

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}> Add to shopping List </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'> Item </Label>
                                <Input type='name' name='name' id="item" autoFocus="autoFocus" placeholder="Add item" onChange={this.onChange} />
                                <Button color="dark" style={{ marginTop: '5rem' }} block> Confirm </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProp = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStateToProp, { addItem })(ItemModal);