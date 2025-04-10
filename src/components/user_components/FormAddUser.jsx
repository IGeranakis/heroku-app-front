// import React,{useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import apiBaseUrl from '../../apiConfig'

// const FormAddUser = () => {
//     const[name,setName]=useState("");
//     const[email,setEmail]=useState("");
//     const[password,setPassword]=useState("");
//     const[confPassword,setConfPassword]=useState("");
//     const[role,setRole]=useState("");
//     const[msg,setMsg]=useState("");
//     const navigate = useNavigate();

//     const saveUser = async (e) =>{
//         e.preventDefault();
//         try{
//             await axios.post(`${apiBaseUrl}/users`, {
//                 name:name,
//                 email:email,
//                 password:password,
//                 confPassword:confPassword,
//                 role:role,
//             });
//             navigate("/users");
//         }catch(error){
//             if(error.response){
//                 setMsg(error.response.data.msg);
//             }
//         }
//     }
//   return (
//     <div>
//         <h1 className='title'>Διαχείριση Χρηστών</h1>
//         <h2 className='subtitle'>Προσθήκη νέου χρήστη</h2>
//         <div className="card is-shadowless">
//             <div className="card-content">
//                 <div className="content">
//                 <form onSubmit={saveUser}>
//                 <p className='has-text-centered'>{msg}</p>
//                 <div className="field">
//                         <label  className="label">Όνομα</label>
//                         <div className="control">
//                             <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Πληκτρολογήστε Όνομα'/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label  className="label">Email</label>
//                         <div className="control">
//                             <input type="text" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Πληκτρολογήστε Email'/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label  className="label">Κωδικός</label>
//                         <div className="control">
//                             <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*********'/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label  className="label">Επαλήθευση Κωδικού</label>
//                         <div className="control">
//                             <input type="password" className="input" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label  className="label">Ρόλος</label>
//                         <div className="control">
//                             <div className="select is-fullwidth">
//                                 <select value={role} onChange={(e)=>setRole(e.target.value)}>
//                                     <option value="" disabled selected>Επιλέξτε Ρόλο</option>
//                                     <option value="admin">Διαχειριστής</option>
//                                     <option value="user">Χρήστης</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <div className="control">
//                             <button type='submit' className="button is-success is-fullwidth">Αποθήκευση</button>
//                         </div>
//                     </div>
//                 </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default FormAddUser

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '../../apiConfig';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // New state for profile image
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const roles = [
        { label: 'Administrator', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Hcp', value: 'hcp' },
        { label: 'Indicator', value: 'indicator' }
    ];

    const saveUser = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle file and text data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confPassword', confPassword);
        formData.append('role', role);
        formData.append('profileImage', profileImage); // Append the selected image
        console.log(profileImage)
        try {
            await axios.post(`${apiBaseUrl}/users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className='title'>User Settings</h1>
            <h2 className='subtitle'>Add New User</h2>
            <div className="card p-fluid">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveUser} encType="multipart/form-data">
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    {/* <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Type Name' /> */}
                                    <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    {/* <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Type Email' /> */}
                                    <InputText id="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    {/* <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********' /> */}
                                    <InputText id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*********'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Confirm Password</label>
                                <div className="control">
                                    {/* <input type="password" className="input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='*********' /> */}
                                    <InputText id="Confpassword" type="password" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="form-label">Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                    <Dropdown 
                                        value={role} 
                                        onChange={(e) => setRole(e.value)} 
                                        options={roles} 
                                        placeholder="Select Role"
                                        className="w-100"
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Profile Image</label> {/* New field for profile image */}
                                <div className="control is-fullwidth">
                                    <input type="file" className="input" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    {/* <button type='submit' className="button is-success is-fullwidth">Save</button> */}
                                    <Button type="submit" label="Save" className="p-button-success is-fullwidth" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddUser;
