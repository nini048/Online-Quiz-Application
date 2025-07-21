import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./Displayinfor";
class MyComponent extends React.Component {
    state = {
        listUsers: [
            {id: 1, name:'nini', age:10},
            {id: 2, name:'nini1', age:50},
            {id: 3, name:'nini2', age:17},
            {id: 4, name:'nini3', age:30},
        ]
    }
    render() {
        return (
            <div>
                <UserInfor/>
                <br />
                <br />
                <DisplayInfor 
                listUsers = {this.state.listUsers}
                />
            </div>
            
        );
    }
}

export default MyComponent;