import React from "react";
class DisplayInfor extends React.Component {
    state = {
        isShowListUsers : true
    }
    handleShowHide = () => {
        
        this.setState({
            isShowListUsers: !this.state.isShowListUsers
        })
    }
    render(){
        console.log(this.props);
        const {listUsers} = this.props;
        console.log('listUsers: ', listUsers);

        return (
            <div>
                <div>
                    <span onClick = {() => this.handleShowHide()}>
                        {this.state.isShowListUsers === true ? 'Hide list users': "Show list users"}
                    </span>
                </div>
                {this.state.isShowListUsers &&
                <div>
                {listUsers.map((user)=>{
                    return (
                        <div key ={user.id} className = {user.age > 18 ? 'green' : 'red' }>
                            <div> My id: {user.id} </div>
                            <div> My name: {user.name} </div>
                            <div>My age: {user.age} </div>
                            <hr />
                        </div>
                    )
                })}

                </div>
    }
            </div>
        );
    }
}

export default DisplayInfor;