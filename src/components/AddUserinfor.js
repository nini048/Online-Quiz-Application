import React, { useEffect, useState } from "react";

const AddUserInfor = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [address, setAddress] = useState('');
    const handleOnChangeInput = (event) => {
      setName(event.target.value);
    }
      const handleOnChangeAge = (event) => {
      setAge(+event.target.value);

    }
      const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
          id: Math.floor((Math.random() * 100) + 1) + '-random',
          name: name,
          age: age
        });
      }
    
      return (
        <div>
          my name is {name} and I'm {age}
          <form onSubmit={(event) => handleOnSubmit(event)}>
            <label>Yourname: </label>
            <input
              value={name}
              type="text"
              onChange={(event) => handleOnChangeInput(event)}
            />

            <label>Yourage: </label>
            <input
              value={age}
              type="number"
              onChange={(event) => handleOnChangeAge(event)}
            />

            <button>Submit</button>
          </form>
        </div>
      )
  }

export default AddUserInfor;
