import { useEffect, useState } from 'react';
import './ManagerQuiz.scss';
import defaul_image from '../../../../assets/default-avatar.png'
import Select from 'react-select';
import { FaCirclePlus } from "react-icons/fa6";
import { deleteQuiz, getAllQuiz, postCreateNewQuiz, putUpdateQuiz, postQuizToUser, getQuizByUser } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



const ManagerQuiz = (props) => {

    const options = [
        { value: 'NONE', label: 'NONE  ' },
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.account.id);
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [activeEditId, setActiveEditId] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false)
    const [submitNewId, setSubmitNewId] = useState('');
    const [listUsers, setListUsers] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState({})
    const navigate = useNavigate();
    const account = useSelector(state => state.user.account);
    const [newImage, setNewImage] = useState(null);











    useEffect(() => {
        fetchQuiz();
    }, [])


    const fetchQuiz = async () => {
        let res = await getQuizByUser()

        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }



    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setNewImage(event.target.files[0]);
        }
        else {
            // setPreviewImage('');
        }
    }
    const handleSubmit = async () => {
        if (!name || !description) {
            toast.error('Name or Description is required');
            return;
        }

        let res = await postCreateNewQuiz(name, description, level, newImage);
        console.log('image: ', image);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            const newQuizId = res.DT.id;

            if (newQuizId && userId) {
                const send = await postQuizToUser(newQuizId, userId);


            }

            setName('');
            setDescription('');
            setImage('');
            setPreviewImage('');
            setSelectedLevel({});
            await fetchQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    const handleDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz)
    }
    const handleEdit = (quiz) => {
        setIsEdit(true);
        setName(quiz.name);
        setDescription(quiz.description);
        setLevel(quiz.difficulty)
        setImage(quiz.image)
        setPreviewImage(`data:image/jpeg;base64,${quiz.image}`);
        setActiveEditId(quiz.id);
        setSelectedLevel(options.find(option => option.value === quiz.difficulty))
        setNewImage(null);


    }


    const handleCancelUpdate = () => {
        setName('');
        setDescription('');
        setLevel('')
        setImage('');
        setPreviewImage('')
        setActiveEditId(null);
        setIsEdit(false)
        setSelectedLevel({})


        // fetchQuiz();
    }
    const handleUpdate = async () => {
        let data = await putUpdateQuiz(
            activeEditId,
            description,
            name,
            level,
            newImage ? newImage : image
        );


        if (data && data.EC === 0) {
            toast.success('successful!!');
            await fetchQuiz();
            handleCancelUpdate();

        } else
            if (data && data.EC !== 0) {
                toast.error(data.EM);
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
                                // placeholder=''
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Name</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                // placeholder=''
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>Description</label>
                        </div>

                        <div className='my-3'>
                            <Select
                                options={options}
                                // placeholder={'Quiz level...'}
                                value={selectedLevel}
                                onChange={(selectedOption) => {
                                    setSelectedLevel(selectedOption);
                                    setLevel(selectedOption.value);
                                }}

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
                            {isEdit &&
                                (<button className="btn btn-outline-secondary me-3 "
                                    onClick={() => { handleCancelUpdate() }}
                                >Cancel</button>)
                            }
                            <button className='btn btn-outline-success'
                                onClick={!isEdit
                                    ? () => { handleSubmit() }
                                    : () => { handleUpdate() }
                                }
                            >
                                {!isEdit ? 'Create' : 'Update'}
                            </button>

                        </div>
                    </fieldset>
                </div>

                <div className="right-column">
                    <div className="quiz-right-content">
                        <h5 className="mb-3" style={{ color: '#555' }}>Quiz List</h5>
                        <div className="quiz-card-list">
                            {listQuiz && listQuiz.map((quiz, index) => (
                                <div key={index} className={`quiz-card ${activeEditId === quiz.id ? 'active-edit' : ''}`}>
                                    <img
                                        src={`data:image/jpeg;base64,${quiz.image}`}
                                        alt="quiz"
                                        className="quiz-img"
                                    />
                                    <div className="quiz-info">
                                        <h6 className="quiz-name">{quiz.name}</h6>
                                        <p className="quiz-description">{quiz.description}</p>
                                        <span className="quiz-level">Level: {quiz.difficulty}</span>
                                    </div>
                                    <div className="quiz-actions">


                                        <button className="btn btn-outline-danger btn-sm me-2"
                                            onClick={() => { handleDelete(quiz) }}
                                        >Delete</button>
                                        <button className="btn btn-outline-secondary btn-sm me-2"
                                            onClick={() => handleEdit(quiz)}
                                        >Edit</button>
                                        <button className="btn btn-outline-success btn-sm"
                                            onClick={() => { navigate(`/user/manager-questions/${quiz.id}`) }}
                                        >Add</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <ModalDeleteQuiz
                    show={showModalDeleteQuiz}
                    setShow={setShowModalDeleteQuiz}
                    dataDelete={dataDelete}
                    fetchQuiz={fetchQuiz}

                />
                {/* <ModalUpdateQuiz
                    show={showModalUpdateQuiz}
                    setShow={setShowModalUpdateQuiz}
                    fetchQuiz={fetchQuiz}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                   /> */}
            </div>
        </div>

    )

}
export default ManagerQuiz