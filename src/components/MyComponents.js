import React from "react";
class MyComponent extends React.Component {
    state = {
        name: 'nini048',
        address: 'an thai',
        age: 21
    };
    render() {
        return (
            <div> my name is {this.state.name} and I'm from {this.state.address} </div>
            
        );
    }
}

export default MyComponent;