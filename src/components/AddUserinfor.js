import React, { useState } from "react";
// class AddUserInfor extends React.Component {
//   constructor(props) {
//     super(props);
//       this.state = {
//         name: '',
//         address:'',
//         age: 0,
//     };
//   }

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value,
//         })
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value == "" ? 0 : Number(event.target.value),
//         })
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//           id: Math.floor((Math.random()*100)+1) + '-random',
//           name: this.state.name,
//           age: this.state.age
//         });
//     }
//   render() {

//     return (
//       <div>
//         my name is {this.state.name} and I'm {this.state.age}
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Yourname: </label>
//           <input
//             value={this.state.name}
//             type="text"
//             onChange={(event) => this.handleOnChangeInput(event)}
//           />

//           <label>Yourage: </label>
//           <input
//             value={this.state.age}
//             type="number"
//             onChange={(event) => this.handleOnChangeAge(event)}
//           />

//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
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
