import { React, Component } from "react";
import Button from 'react-bootstrap/Button';

class Toggle extends Component {
    render() {
        return (
            <Button 
                variant={this.props.isToggleOn ? 'primary' : 'outline-primary'}
                onClick={() => this.props.onStateChanged(this.props.value)}>
                {this.props.caption} {this.props.isToggleOn}
            </Button>
        );
    }
}

export default Toggle;