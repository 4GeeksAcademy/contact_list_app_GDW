import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';

export const ListOfContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const backUpId = id;

    const [contactId, setContactId] = useState("")
    const [contactFullName, setFullName] = useState("")
    const [contactAddress, setAddress] = useState("")
    const [contactPhone, setPhone] = useState("")
    const [contactEmail, setEmail] = useState("")

    /* TODO
        - Placeholder values show first contact info, not the selected contact's info: fix/change/remove
        - Contact ID numbers are showing for some reason 
        - Delete button deletes the contacts from top to bottom, doesn't delete the contact in question 

        * Errors must be to do with how I'm handling the list of contacts and in what order I'm manipulating them 
        ... Otherwise, I have all the desired functionality 
    */

    useEffect(() => {
        actions.openContactBook(backUpId);
    }, [])

    useEffect(() => {
        actions.updateContact(contactFullName, contactAddress, contactPhone, contactEmail, backUpId, contactId);
    }, [contactId])

    useEffect(() => {
        store.contactUpdated === true ? actions.openContactBook(backUpId) : null
        store.contactUpdated = false
    }, [store.contactUpdated])

    return (
        <div className="container">
            {/* HEADER */}
            <div className="mb-3 d-flex justify-content-between">
                <h1>{id}'s List of Contacts</h1>
                <div>
                    <Link to={`/addcontact/${id}`}>
                        <button >
                            Add a new contact
                        </button>
                    </Link>
                </div>
            </div>
            {/* LIST */}
            <ul className="list-group">
                {store.userContactList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='mt-3'>
                                Contact #{index + 1}
                            </div>
                            <li className="list-group-item d-flex justify-content-between">
                                <div className="d-flex">
                                    <div className="me-2">
                                        PHOTO
                                    </div>
                                    <div>
                                        {item.full_name}
                                        <br></br>
                                        {item.address}
                                        <br></br>
                                        {item.phone}
                                        <br></br>
                                        {item.email}
                                        <br></br>
                                        {item.id}
                                    </div>
                                </div>
                                <div>
                                    <button type='button' data-bs-toggle='modal' data-bs-target='#editModal'>Edit</button>

                                    {/* EDIT Modal  */}
                                    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Contact</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form className="modal-body d-flex flex-column gap-2 align-items-start">
                                                    <p>Below you see the current information for this contact.</p>
                                                    <p>Please fill in <b>ALL</b> the fields, changing the information where desired.</p>
                                                    <div>
                                                        <label htmlFor="full_name" className='me-2'>Full Name</label>
                                                        <br></br>
                                                        <input
                                                            id='full_name'
                                                            placeholder={item.full_name}
                                                            value={contactFullName}
                                                            onChange={e => setFullName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="address" className='me-2'>Address</label>
                                                        <br></br>
                                                        <input
                                                            id='address'
                                                            placeholder={item.address}
                                                            value={contactAddress}
                                                            onChange={e => setAddress(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className='me-2'>Phone</label>
                                                        <br></br>
                                                        <input
                                                            id='phone'
                                                            placeholder={item.phone}
                                                            value={contactPhone}
                                                            onChange={e => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className='me-2'>Email</label>
                                                        <br></br>
                                                        <input
                                                            id='email'
                                                            placeholder={item.email}
                                                            value={contactEmail}
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </form>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        onClick={() => setContactId(item.id)}
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type='button' data-bs-toggle='modal' data-bs-target='#checkModal'>Bin</button>

                                    {/* DELETE Modal  */}
                                    <div className="modal fade" id="checkModal" tabIndex="-1" aria-labelledby="checkModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => { actions.deleteContact(item.id); }} data-bs-dismiss="modal">
                                                        Yes, delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </div>
                    );
                })}
            </ul>
            {/* RETURN LINK  */}
            <div className="mt-3 text-center">
                <Link to="/" >Home</Link>
            </div>
        </div>
    )
}