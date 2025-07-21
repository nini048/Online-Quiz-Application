import React from "react";
class DisplayInfor extends React.Component {
    render(){
        console.log(this.props);
        const {listUsers} = this.props;
        console.log('listUsers: ', listUsers);

        return (
            <div>
                {listUsers.map((user)=>{
                    return (
                        <div key ={user.id}>
                            <div> My id: {user.id} </div>
                            <div> My name: {user.name} </div>
                            <div>My age: {user.age} </div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default DisplayInfor;