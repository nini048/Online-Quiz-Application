import { useState } from 'react';
import './ManagerQuiz.scss';
import { FaPlus } from 'react-icons/fa';
const ManagerQuiz = (props) => {
    return (
        <div className="quiz-container">
            <div className="title">
                 <FaPlus /> Tạo Quiz Mới
            </div>
            <div className="add-new">
                                <div className="form-group">
                    <label>Tên Quiz:</label>
                    <input
                        type="text"
                        // value={name}
                        // onChange=
                        placeholder="Nhập tên quiz"
                    />
                </div>


                {/* <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Personalia:</legend>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                </fieldset> */}

            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}
export default ManagerQuiz