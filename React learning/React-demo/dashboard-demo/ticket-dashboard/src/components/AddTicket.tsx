import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../styles/form.css'

interface TicketValues {
  title: string;
  description: string;
  name: string;
  tags: string;
  priority: string;
  date: string;
  createdBy: string;
}

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  id: string;
}

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  loginUser: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  name: Yup.string().required("Please select name"),
  tags: Yup.string().required("Please select tag"),
  priority: Yup.string().required("Please select priority"),
});

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
};
const ticketDate = getDate()

const AddTicket: React.FC<ModalFormProps> = ({ show, handleClose, loginUser }) => {
  const [selectOption, setSelectOption] = useState<FormValues[]>([]);
  const [currentDate, setCurrentDate] = useState(ticketDate);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const users: FormValues[] = await response.json();
        setSelectOption(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);



  const handleAddTicket = async (values: TicketValues) => {
    try {
      const response = await fetch("http://localhost:3001/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData, "data going to API");
      setCurrentDate(ticketDate)
      handleClose();
    } catch (error) {
      console.error("Error posting ticket data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      name: "",
      tags: "",
      priority: "",
      date: currentDate,
      createdBy: loginUser
    },
    validationSchema: validationSchema,
    onSubmit: (values: TicketValues) => handleAddTicket(values),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="title" className="form-field">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              className={formik.errors.title && formik.touched.title ? "error-border" : ""}
              {...formik.getFieldProps("title")}
            />
            <Form.Text className="text-danger">
              {formik.touched.title && formik.errors.title}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="description" className="form-field">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter description"
              className={formik.errors.description && formik.touched.description ? "error-border" : ""}
              {...formik.getFieldProps("description")}
            />
            <Form.Text className="text-danger">
              {formik.touched.description && formik.errors.description}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="name" className="form-field">
            <Form.Label>Name</Form.Label>
            <Form.Control as="select" {...formik.getFieldProps("name")} className={formik.errors.name && formik.touched.name ? "error-border" : ""}>
              <option>Select Name</option>
              {selectOption &&
                selectOption.map((user: FormValues) => {
                  return (
                    <option
                      value={`${user.firstName} ${user.lastName}`}
                      key={user.id}
                    >{`${user.firstName} ${user.lastName}`}</option>
                  );
                })}
            </Form.Control>
            <Form.Text className="text-danger">
              {formik.touched.name && formik.errors.name}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="tags" className="form-field">
            <Form.Label>Tags</Form.Label>
            <Form.Control as="select" {...formik.getFieldProps("tags")} className={formik.errors.tags && formik.touched.tags ? "error-border" : ""}>
              <option>Select Tags</option>
              <option value="Replace">Replace</option>
              <option value="New">New</option>
              <option value="Issue">Issue</option>
              <option value="Issue">Repair</option>
            </Form.Control>
            <Form.Text className="text-danger">
              {formik.touched.tags && formik.errors.tags}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="priority" className="form-field">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" {...formik.getFieldProps("priority")} className={formik.errors.priority && formik.touched.priority ? "error-border" : ""}>
              <option>Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Control>
            <Form.Text className="text-danger">
              {formik.touched.priority && formik.errors.priority}
            </Form.Text>
          </Form.Group>

          <div className="addticket-btn">
            <Button className="btn close-btn" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTicket;


























// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Form } from "react-bootstrap";
// import { Formik, Field } from "formik";
// import * as Yup from "yup";

// interface TicketValues {
//     title: string;
//     description: string;
//     name: string;
//     tags: string;
//     priority: string;
//     date?: string;
// }

// interface FormValues {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     password?: string;
//     role?: string;
//     id: string;
// }

// const AddTicketSchema = Yup.object().shape({
//     title: Yup.string()
//         .min(2, "Too Short!")
//         .max(50, "Too Long!")
//         .required("Title is required"),
//     description: Yup.string()
//         .min(5, "Too Short!")
//         .max(50, "Too Long!")
//         .required("Description is required"),
//     name: Yup.string().required("Please select user name"),
//     tags: Yup.string().required("Please select tags"),
//     priority: Yup.string().required("Please select priority"),
// });

// const AddTicket = () => {
//     const [show, setShow] = useState<boolean>(false);
//     const handleClose = (): void => setShow(false);
//     const [selectOption, setSelectOption] = useState<FormValues[]>([]);
//     const [currentDate, setCurrentDate] = useState<string>("")
//     const handleShow = (): void => setShow(true);

//     const getDate = () => {
//         const today = new Date();
//         const month = today.getMonth() + 1;
//         const year = today.getFullYear();
//         const date = today.getDate();
//         return `${year}-${month}-${date}`;
//     }
//     let date = getDate();


//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const response: Response = await fetch("http://localhost:3001/users");
//                 const user: FormValues[] = await response.json();
//                 console.log(user, "users from api");
//                 setSelectOption(user);
//                 setCurrentDate(date)
//             } catch (error) {
//                 console.log(error, "error to fetch data");
//             }
//         };
//         getUsers();
//     }, []);

//     const HandleAddTicket = async (values: TicketValues) => {
//         try {
//             const data = await fetch("http://localhost:3001/ticket", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ ...values, date: currentDate }),
//             });
//             const formData = await data.json();
//             console.log(formData, "user data posting on api ");
//         } catch (error) {
//             console.error(error, "error posting data to API");
//         }
//     };

//     const initialValues: TicketValues = {
//         title: "",
//         description: "",
//         name: "",
//         tags: "",
//         priority: "",
//         date: currentDate,
//     };

//     return (
//         <div>
//             <Button variant="primary" onClick={handleShow}>
//                 Add Ticket
//             </Button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Ticket</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={AddTicketSchema}
//                         onSubmit={HandleAddTicket}
//                     >
//                         {({ errors, touched }) => (
//                             <Form>
//                                 <Form.Group controlId="formTitle">
//                                     <Form.Label>Title</Form.Label>
//                                     <Form.Control type="text" name="title" placeholder="" />
//                                     {errors.title && touched.title ? (
//                                         <div className="error-text">{errors.title}</div>
//                                     ) : null}
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="formTextarea">
//                                     <Form.Label>Description</Form.Label>
//                                     <Form.Control as="textarea" name="description" rows={2} />
//                                     {errors.description && touched.description ? (
//                                         <div className="error-text">{errors.description}</div>
//                                     ) : null}
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="formUsername">
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Select name="name" aria-label="formUsername">
//                                         <option>Select Name</option>
//                                         {selectOption.map((user: FormValues) => (
//                                             <option
//                                                 value={`${user.firstName} ${user.lastName}`}
//                                                 key={user.id}
//                                             >
//                                                 {`${user.firstName} ${user.lastName}`}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                     {errors.name && touched.name ? (
//                                         <div className="error-text">{errors.name}</div>
//                                     ) : null}
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="formTags">
//                                     <Form.Label>Tags</Form.Label>
//                                     <Form.Select name="tags" aria-label="formTags">
//                                         <option>Select Tags</option>
//                                         <option value="Replace">Replace</option>
//                                         <option value="New">New</option>
//                                         <option value="Issue">Issue</option>
//                                         <option value="Issue">Repair</option>
//                                         {errors.tags && touched.tags ? (
//                                             <div className="error-text">{errors.tags}</div>
//                                         ) : null}
//                                     </Form.Select>
//                                 </Form.Group>

//                                 <Form.Group className="mb-3" controlId="formPriority">
//                                     <Form.Label>Priority</Form.Label>
//                                     <Form.Select name="priority" aria-label="formPriority">
//                                         <option>Select Priority</option>
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                         {errors.priority && touched.priority ? (
//                                             <div className="error-text">{errors.priority}</div>
//                                         ) : null}
//                                     </Form.Select>
//                                 </Form.Group>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={handleClose}>
//                                         Close
//                                     </Button>
//                                     <Button variant="primary" type="submit">
//                                         Submit
//                                     </Button>
//                                 </Modal.Footer>
//                             </Form>
//                         )}
//                     </Formik>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default AddTicket;
