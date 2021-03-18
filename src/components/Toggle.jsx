import { React, Component } from "react";

class Toggle extends Component {
    render() {
        return (
            <button 
                className={this.props.state === 'checked' ? 'toggleChecked' : 'toggle'}
                onClick={() => this.props.onStateChanged(this.props.value)}>
                {this.props.caption} {this.props.state}
            </button>
        );
    }
}

export default Toggle;