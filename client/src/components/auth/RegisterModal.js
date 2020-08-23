import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends React.Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            //CHECK for Register Error
            if( error.id == 'REGISTER_FAIL'){
                this.setState({
                    error: error.msg.msg
                })
            }
            else{
                this.setState({
                    msg: null
                })
            }
        }
        //If authentication done, close the modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }  
        }
    }

    toggle = ()=>{
        this.props.clearErrors()
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
        const {name, email, password} = this.state;
        const newUser = {name, email,password};
        //Attemp to register
        this.props.register(newUser);
    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}> Register </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="dange">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup> 
                                <Label for='name'> Name </Label>
                                <Input type='name' name='name' id="name" autoFocus="autoFocus" placeholder="Name" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup> 
                                <Label for='email'> Email </Label>
                                <Input type='email' name='email' id="email" autoFocus="autoFocus" placeholder="email-id" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup> 
                                <Label for='password'> Password </Label>
                                <Input type='password' name='password' id="password" autoFocus="autoFocus" placeholder="Password" onChange={this.onChange} />
                            </FormGroup>
                            <Button color="dark" style={{marginTop: '5rem'}} block> Register </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProp = (state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})

export default connect( mapStateToProp ,{register, clearErrors})(RegisterModal);