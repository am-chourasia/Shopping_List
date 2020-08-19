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
import {connect} from 'react-redux';
import {addItem}  from '../actions/itemActions';

class ItemModal extends React.Component {
    state = {
        modal: false,
        name: ''
    }
    toggle = ()=>{
        this.setState({
            modal : !this.state.modal
        })
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })   
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }
        this.props.addItem(newItem);
        this.toggle(); //closing the modal
    }

    render(){
        return(
            <div>
                <Button color="dark" style={{marginBottom: '2rem', marginLeft: '1rem'}} onClick={this.toggle}> 
                    Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}> Add to shopping List </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup> 
                                <Label for='item'> Item </Label>
                                <Input type='name' name='name' id="item" autoFocus="autofocus" placeholder="Add item" onChange={this.onChange} />
                                <Button color="dark" style={{marginTop: '5rem'}} block> Confirm </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProp = (state)=>({
    item: state.item  
})

export default connect( mapStateToProp ,{addItem})(ItemModal);