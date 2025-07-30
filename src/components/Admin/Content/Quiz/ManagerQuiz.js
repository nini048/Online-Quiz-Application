import { useState } from 'react';
import './ManagerQuiz.scss';
import Select from 'react-select';
import { FaCirclePlus } from "react-icons/fa6";
const ManagerQuiz = (props) => {

    const options = [
        { value: 'NONE', label: 'NONE  ' },
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState();
    const [level, setLevel] = useState('NONE');

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
        else {
            // setPreviewImage('');
        }
    }
    return (
        <div className="quiz-container">
            <div className="layout">
                <div className="left-column">
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-3">Tạo Quiz</legend>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                value = {name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Name</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                value = {description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>Description</label>
                        </div>

                        <div className='my-3'>
                            <Select
                                options={options}
                                placeholder={'Quiz level...'}
                                // value = {description}
                             
                            />
                        </div>
                        <div className="more-actions">
                            <label className='form-label label-upload' htmlFor="labelUpload">
                                <FaCirclePlus /> Upload file image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='labelUpload'
                                onChange={handleUploadImage}
                            />
                        </div>

                        <div className="img-preview">
                            {previewImage ? <img src={previewImage} /> : <span>Preview image</span>}
                        </div>
                    </fieldset>
                </div>

                <div className="right-column">
                    <div className="placeholder">
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ManagerQuiz