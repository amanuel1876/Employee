import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeTeam } from "../../http";
import { NavLink } from 'react-router-dom';
import { setTeam } from '../../store/team-slice';
import { setTeamMembers } from '../../store/user-slice';
import Loading from '../Loading';

const UserTeams = () => {
    const { user } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [userteam, setUserTeam] = useState(null);

    useEffect(() => {
        dispatch(setTeam(null));
        dispatch(setTeamMembers(null));
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.team?.id) {
                const res = await getEmployeeTeam(user.team.id);
                if (res.success) {
                    setUserTeam(res.data);
                }
                setLoading(false);
            } else {
                setLoading(false); // Handle case where team ID is not available
            }
        };
        fetchData();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {userteam ? (
                <div>
                    <div className="main-content">
                        <section className="section">
                            <div className="card">
                                <div className="card-header">
                                    <h4>All Teams</h4>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-md center-text">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Leader</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>
                                                        <figure className="avatar">
                                                            <img src={userteam.image} alt={userteam.name} />
                                                        </figure>
                                                    </td>
                                                    <td>{userteam.name}</td>
                                                    <td>
                                                        {userteam.leader ? (
                                                            <NavLink to='/' className='badge badge-primary' style={{ padding: '0px 10px' }}>
                                                                <img src={userteam.leader.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96" />
                                                                {userteam.leader.name}
                                                            </NavLink>
                                                        ) : (
                                                            <div className='badge badge-light' style={{ padding: '0px 10px' }}>
                                                                <img src='/assets/icons/user.png' className='avatar avatar-sm mr-2' alt="data" width="96" height="96" />
                                                                No Leader
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className={`badge ${userteam.status === 'Active' ? 'badge-primary' : 'badge-danger'}`}>{userteam.status}</div>
                                                    </td>
                                                    <td>
                                                        <NavLink to={`/userteam/${userteam.id}`} className="btn btn-primary">Detail</NavLink>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            ) : (
                <div>No team found.</div>
            )}
        </>
    );
};

export default UserTeams;