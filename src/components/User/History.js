import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios'; // hoặc sử dụng instance tùy bạn
import { getHistory } from '../../services/apiServices';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
         console.log('>>history ', history);


    }, []);
    const fetchHistory = async () => {
        try {
            const res = await getHistory()
            console.log('res: ', res);

            if (res?.DT) {
                setHistory(res?.DT?.data.reverse());

            }
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Lịch sử làm bài</h3>
            <table className="table table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên bài quiz</th>
                        <th>Mô tả</th>
                        <th>Số câu hỏi</th>
                        <th>Số câu đúng</th>
                        <th>Thời gian làm</th>
                    </tr>
                </thead>
                <tbody>
                    {history?.length > 0 ? (
                        history.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item?.quizHistory?.name}</td>
                                <td>{item?.quizHistory?.description}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>
                                <td>{moment(item.createdAt).format('HH:mm:ss DD/MM/YYYY')}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default History;
