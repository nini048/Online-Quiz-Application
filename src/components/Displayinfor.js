import React from "react";
import './Displayinfor.scss';
import logo from '../logo.svg';
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
            <div className='display-infor-container'>
                {/* <img src={logo} alt="logo" /> */}
                <div>
                    <span onClick = {() => this.handleShowHide()}>
                        {this.state.isShowListUsers === true ? 'Hide list users': "Show list users"}
                    </span>
                </div>
                {this.state.isShowListUsers &&
                <>
                {listUsers.map((user)=>{
                    return (
                        <div key={user.id} className={user.age > 18 ? 'green' : 'red'}>
                            <div>
                                <div> My id: {user.id} </div>
                                <div> My name: {user.name} </div>
                                <div>My age: {user.age} </div>
                            </div>
                            <div>
                                <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                            </div>
                            <hr />
                        </div>
                    )
                })}

                </>
    }
            </div>
        );
    }
}

export default DisplayInfor;