import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { Table } from "react-bootstrap";
import { loginUser } from "../store/userSlice";
import { RootState } from "../store/store";
import '../style/timer.css'
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginUser());
  }, []);
 
  const handleLogOut = () => {
    sessionStorage.removeItem("userEmail");
    navigate('/');

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="user-table">
              <h3 className="text-center m-4">Users Table</h3>
              <button onClick={handleLogOut} className="home-btn">Log out</button>
            </div>
            <Table striped bordered hover table-responsive="true">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
