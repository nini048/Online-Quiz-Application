import React, { useState } from "react";
import AddUserInfor from "./AddUserinfor";
import DisplayInfor from "./Displayinfor";

const MyComponent = (props) => {
    const [listUsers, setListUsers] = useState([
            {id: 1, name:'nini', age:10},
            {id: 2, name:'nini1', age:50},
            {id: 3, name:'nini2', age:17},
            {id: 4, name:'nini3', age:30},
    ])
    const handleAddNewUser = (userObj) => {
        setListUsers([userObj,...listUsers ] )
    }
    const handleDeleteUser = (userId) => {
        let listUsersClone = listUsers;
        listUsersClone = listUsersClone.filter(item => item.id !== userId);
        setListUsers(listUsersClone)
    }
    
    return (
        <>
                <AddUserInfor
                    handleAddNewUser = {handleAddNewUser}
                />
                <br />
                <br />
                <DisplayInfor 
                    listUsers = {listUsers}
                    handleDeleteUser= {handleDeleteUser}
                />

            </>
    )
}
export default MyComponent;