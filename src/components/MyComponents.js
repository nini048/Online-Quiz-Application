import React from "react";
class MyComponent extends React.Component {
    state = {
        name: 'nini048',
        address: 'an thai',
        age: 21
    };
    handleClick = (event) => {

        console.log("Click button");
        console.log("My name is ",this.state.name);
        this.setState({
            age: Math.floor((Math.random() * 100) + 1)
        })
        
    }
    handleOnMouseOver = (event) => {
        console.log(event.pageX);
    }
    render() {
        return (
            <div>
                my name is {this.state.name} and I'm {this.state.age}
                {/* <button onMouseOver={this.handleOnMouseOver}>Hover Me</button> */}
                <button onClick={(event) => {this.handleClick(event)}}>Click Me</button>
                </div>
        );
    }
}

export default MyComponent;