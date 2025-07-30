import { useState } from 'react';
import './ManagerQuiz.scss';
import defaul_image from '../../../../assets/default-avatar.png'
import Select from 'react-select';
import { FaCirclePlus } from "react-icons/fa6";
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
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
    const handleSubmit = async () => {
        if (!name || !description) {
            toast.error('Name or Description is required')
            return;
        }
        let res = await postCreateNewQuiz(name, description, level?.value, image)
        console.log('res: ', res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setDescription('')
            setImage('');
            setPreviewImage('')
        }
        else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <div className="layout">
                <div className="left-column">
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-3">Quiz</legend>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Name</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>Description</label>
                        </div>

                        <div className='my-3'>
                            <Select
                                options={options}
                                placeholder={'Quiz level...'}
                                defaultValue={level}
                                onChange={setLevel}
                                // value = {description}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused ? '#999999' : base.borderColor,
                                        boxShadow: state.isFocused ? '0 0 3px rgba(153, 153, 153, 0.25)' : base.boxShadow,
                                        '&:hover': {
                                            borderColor: '#999999'
                                        }
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
                                        color: 'black',
                                    }),

                                }}

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
                        <div className="btn-create mt-3 d-flex justify-content-end">
                            <button className='btn btn-secondary'
                                onClick={() => { handleSubmit() }}
                            >Create</button>
                        </div>
                    </fieldset>
                </div>

                <div className="right-column">
                    <div className="quiz-right-content">
                        <h5 className="mb-3" style={{ color: '#555' }}>Danh sách Quiz đã tạo</h5>
                        <div className="quiz-card-list">
                            {[1, 2, 3, 4].map((item, index) => (

                                <div key={index} className="quiz-card">
                                    <img
                                        src={defaul_image}
                                        alt="quiz"
                                        className="quiz-img"
                                    />
                                    <div className="quiz-info">
                                        <h6 className="quiz-name">Quiz số {item}</h6>
                                        <p className="quiz-description">Mô tả quiz thú vị về kiến thức lập trình.</p>
                                        <span className="quiz-level">Level: EASY</span>
                                    </div>
                                    <div className="quiz-actions">
                                        <button className="btn btn-outline-secondary btn-sm">Sửa</button>
                                        <button className="btn btn-outline-danger btn-sm ms-2">Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default ManagerQuiz