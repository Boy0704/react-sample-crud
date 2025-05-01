import { useState } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export default function UsersCreate() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validation, setValidation] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await api.post('/api/admin/users', {
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => {
            setLoading(false);
            navigate('/admin/users');
        })
        .catch(error => {
            setLoading(false);
            setValidation(error.response.data);
        });
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header">
                            ADD USER
                        </div>
                        <div className="card-body">
                            {
                                loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                            
                            {
                                validation.errors && (
                                    <div className="alert alert-danger mt-2 pb-0">
                                        {
                                            validation.errors.map((error, index) => (
                                                <div key={index}>{error.path} : {error.msg }</div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="full name" />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                        placeholder="Email Address" />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                        placeholder="Password" />
                                </div>

                                <button type="submit" className="btn btn-sm btn-primary">SAVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}