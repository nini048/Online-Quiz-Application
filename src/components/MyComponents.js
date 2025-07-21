import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./Displayinfor";
class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <UserInfor/>
                <br />
                <br />
                <DisplayInfor name= 'nini' age= {30}/>
            </div>
            
        );
    }
}

export default MyComponent;