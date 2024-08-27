import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "../../../http"; // Adjust your import path if needed
import { setTeam } from '../../../store/team-slice';
// import LeaderModal from "../../modal/LeaderModal";
// import LeadersModal from "./modal/LeadersModal";
// import MembersModal from "./modal/MembersModal";

const Team = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams(); // Extracting the teamId from URL parameters
  const team = useSelector(state => state.teamSlice.team);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getTeam(teamId);
        if (res.success) {
          dispatch(setTeam(res.data)); // Assuming res.data contains the team information
        } else {
          console.error('Failed to fetch team:', res.message);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, [dispatch, teamId]);

  const modalAction = () => {
    // Logic to open the member addition modal
  };

  const modalLeaderAction = () => {
    // Logic to open the leader modal
  };

  const modalLeadersAction = () => {
    // Logic to open the leaders modal
  };

  return (
    <div className="main-content">
      <section className="section">
        {team && (
          <>
            <div className="section-header d-flex justify-content-between">
              <h1>Team</h1>
              <div>
                <NavLink to={`/editteam/${teamId}`} className='btn btn-primary mr-4'>Edit Team</NavLink>
                <button onClick={modalAction} className='btn btn-primary'>Add Member</button>
              </div>
            </div>

            <div className="card">
              <div className="card-body row">
                <div className="col-md-3">
                  <img className='img-fluid img-thumbnail' src={team.image} alt={team.name} />
                </div>
                <div className="col-md-9">
                  <table className='table'>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{team.name}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{team.description}</td>
                      </tr>
                      <tr>
                        <th>Leader</th>
                        <td>
                          {team.leader ? (
                            <button className='badge btn badge-primary' onClick={modalLeaderAction} style={{ padding: '0px 10px' }}>
                              <img src={team.leader.image} className='avatar avatar-sm mr-2' alt="Leader" width="96" height="96" />
                              {team.leader.name}
                            </button>
                          ) : (
                            <button onClick={modalLeadersAction} className='badge badge-light btn' style={{ padding: '0px 10px' }}>
                              <img src='../assets/icons/user.png' className='avatar avatar-sm mr-2' alt="No Leader" />
                              No Leader
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Team;