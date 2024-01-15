import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from "rc-pagination";

interface TicketDetails {
    ticket: Ticket[];
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


const Cards: React.FC<TicketDetails> = ({ ticket }) => {
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

    const ticketCards = ticket.slice(startIndex, endIndex);



    return (

        <div className='ticket-cards'>

            {
                ticketCards.map((ticket: Ticket) => {
                    return (

                        <Card className='detail-card' key={ticket.id}>
                            <Card.Body className='card-item'>
                                <Card.Title className='text-center'>{ticket.tags}: Ticket</Card.Title>
                                <div className='card-fields'>
                                    <Card.Subtitle className=" text-muted">Title </Card.Subtitle>
                                    <Card.Text>
                                        {ticket.title}
                                    </Card.Text>
                                </div>
                                <div className='card-fields'>
                                    <Card.Subtitle className=" text-muted">Description </Card.Subtitle>
                                    <Card.Text>
                                        {ticket.description}
                                    </Card.Text>
                                </div>
                                <div className='card-fields'>
                                    <Card.Subtitle className=" text-muted">User Name</Card.Subtitle>
                                    <Card.Text>
                                        {ticket.name}
                                    </Card.Text>
                                </div>
                                <div className='card-fields'>
                                    <Card.Subtitle className=" text-muted">Tags </Card.Subtitle>
                                    <Card.Text>
                                        {ticket.tags}
                                    </Card.Text>
                                </div>
                                <div className='card-fields'>
                                    <Card.Subtitle className=" text-muted">Priority</Card.Subtitle>
                                    <Card.Text>
                                        {ticket.priority}
                                    </Card.Text>
                                </div>
                                <div className="card-button">
                                    <Button variant="primary" className='btn card-btn edit-btn'>Edit</Button>
                                    <Button variant="secondary" className='btn card-btn'>Delete</Button>
                                </div>

                            </Card.Body>
                        </Card>

                    )
                })
            }
            <Pagination
                current={currentPage}
                total={ticket.length}
                pageSize={itemsPerPage}
                onChange={onPageChange}
            />


        </div>




    )
}

export default Cards
