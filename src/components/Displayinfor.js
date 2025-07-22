import React, { useState } from "react";
import './Displayinfor.scss';
import logo from '../logo.svg';

const DisplayInfor = (props) => {
    const { listUsers } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true);
    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser); 
    }
        return (
            <div className='display-infor-container'>
                <div>
                    <span onClick={() => handleShowHideListUser()}>
                        {isShowHideListUser === true ? 'Show List Users' : 'Hide List Users'}
                    </span>
                </div>
                {isShowHideListUser &&
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
                                <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
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
export default DisplayInfor;