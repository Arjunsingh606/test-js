import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Button from "react-bootstrap/Button";
import AddTicket from "./AddTicket";

interface TicketValue {
  ticket: Ticket[];
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  loginUser: string;
  userRole: string;
}
interface Ticket {
  title: string;
  description: string;
  name: string;
  tags: string;
  priority: string;
  date: string;
  id?: string;
  createdBy?: string;
}

const List: React.FC<TicketValue> = ({ ticket, show, handleClose, userRole, handleShow, loginUser }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setTotalPages(Math.ceil(ticket.length / itemsPerPage));
  }, [ticket]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedTickets = ticket.slice(startIndex, endIndex);

  const handleDelete= async(id:string) => {
    try {
      if (userRole === "Admin") {
        const deleteResponse = await fetch(
          `http://localhost:3001/ticket/${id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          console.log("ticket deleted");
        } else {
          console.log("Failed to delete ticket.");
        }
      } else {
        alert("User is not allowed to delete ticket.");
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>COMPLINE ID</th>
            <th>LATEST MESSAGE</th>
            <th>ASSIGNED</th>
            <th>PRIORITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {displayedTickets.map((item: Ticket, index: number) => {
            return (
              <tr key={item.id}>
                <td>{startIndex + index + 1}</td>
                <td>{item.name}</td>
                <td>TID : {item.id}</td>
                <td>
                  <span
                    className={`ticket-tags ${item.tags === "Replace"
                      ? "replace-tag"
                      : item.tags === "New"
                        ? "new-tag"
                        : item.tags === "Issue"
                          ? "issue-tag"
                          : item.tags === "Repair"
                            ? "repair-tag"
                            : ""
                      }`}
                  >
                    {item.tags}
                  </span>
                  <b>{item.title}</b> <p> {item.description}</p>
                </td>
                <td>{item.createdBy}</td>
                <td>
                  <span
                    className={`ticket-tags ${item.priority === "High"
                      ? "replace-tag"
                      : item.priority === "Low"
                        ? "new-tag"
                        : item.priority === "Medium"
                          ? "repair-tag"
                          : ""
                      }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td>
                  <div className="card-button">
                    <div>
                      <Button variant="primary" className="btn card-btn edit-btn" onClick={handleShow}>
                        Edit
                      </Button>
                      {/* <AddTicket show={show} handleClose={handleClose} loginUser={loginUser} /> */}
                    </div>

                    <Button variant="secondary" onClick={(e:any)=>handleDelete(e)} className="btn card-btn">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        current={currentPage}
        total={ticket.length}
        pageSize={itemsPerPage}
        onChange={onPageChange}
      />
    </>
  );
};

export default List;

