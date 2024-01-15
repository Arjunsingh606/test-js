import React, { useEffect, useState } from "react";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Table } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";
import "../styles/dashboard.css";
import { Nav, Tab } from "react-bootstrap";
import AddTicket from "./AddTicket";
import List from "./List";
import Details from "./Details";
import { Button } from "react-bootstrap";

interface TicketValues {
    title: string;
    description: string;
    name: string;
    tags: string;
    priority: string;
    date: string;
}

const Dashboard = () => {
    const [show, setShow] = useState<boolean>(false);
    const [ticket, setTicket] = useState<TicketValues[]>([]);
    const [search, setSearch] = useState<string>("");


    const user = JSON.parse(`${sessionStorage.getItem("loginUser")}`)
    const loggedInUser = `${user.firstName} ${user.lastName}`;
    const userRole = user.role;
  
    


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:3001/ticket");
                const tickets: TicketValues[] = await response.json();
                setTicket(tickets)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, []);

    const handleSearchTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
        ticket.map((ticket) => {

            return (
                ticket.title.toLowerCase().includes(search) ||
                ticket.description.toLowerCase().includes(search) ||
                ticket.tags.toLowerCase().includes(search) ||
                ticket.priority.toLowerCase().includes(search) ||
                ticket.name.toLowerCase().includes(search)
            )
        })

    }

    // const filterSearch = () => {

    // }


    return (
        <>
            <Container fluid style={{ backgroundColor: "#d2d1d6" }}>
                <Row>
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                >
                    <Row className="dashboard">

                        <Col className="dashboard-items">
                            <div>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                                </Form.Group>
                                {/* <Button>Search</Button> */}
                            </div>

                            <div className="filter-items">
                                <div>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="Date" placeholder=" date filter" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Select
                                        name="Filter"
                                        className="filter"
                                        aria-label="Default select example"
                                    >
                                        <option>Filter</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </Form.Select>
                                </div>

                                <div>
                                    <Button variant="primary" onClick={handleShow}>
                                        Add Ticket
                                    </Button>

                                    <AddTicket show={show} handleClose={handleClose} loginUser={loggedInUser} />
                                </div>
                                <div>


                                    <Nav variant="pills" className="list-details-btn">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">List</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Details</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                </div>
                            </div>
                        </Col>
                        <Row className="table-row">
                            <Col>
                                {/* //tabs alignment ssue */}


                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <List ticket={ticket} userRole={userRole} show={show} handleClose={handleClose} handleShow={handleShow} loginUser={loggedInUser} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second"><Details ticket={ticket} /></Tab.Pane>
                                </Tab.Content>

                            </Col>
                        </Row>
                    </Row>
                </Tab.Container>

            </Container>
        </>
    );
};

export default Dashboard;
