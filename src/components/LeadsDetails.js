// src/components/Leads.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Button, Card, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { matchPath, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAxios } from '../utils/useAxios';
import ApiConfig from '../config/apiConfig';

const LOGIN_AXIOS_CONFIG = ApiConfig.LEAD;

const LeadsDetails = () => {

    // const [leads, setLeads] = useState([]);
    const statuses = [
        {"name":"pending"},
        {"name":"in_progress"},
        {"name":"declined"},
        {"name":"completed"},
        {"name":"inactive"},
    ]
    const interaction_types = [
        {"name":"sms"},
        {"name":"call"},
        {"name":"in-person meeting"},
    ]
    const [lead, setLead] = useState({});
    const [interactions, setInteractions] = useState([]);
    const [status, setStatus] = useState('pending');


    const [interactionFormData, setInteractionFormData] = useState({ interaction_type: 'mail',comment: '' });
    const [customerFormData, setCustomerFormData] = useState({ address: '',phone_number: '' });
    
    const [leadUpdatedAxioConfig, setLeadUpdateAxios] = useState(null);
    const { response: leadUpdateData, error } = useAxios(leadUpdatedAxioConfig);

    const [leadInteractionCreatedAxioConfig, setLeadInteractionCreateAxios] = useState(null);
    const { response: leadInteractionCreateData, leadInteractionCreateError } = useAxios(leadInteractionCreatedAxioConfig);

    const [leadCustomerCreatedAxioConfig, setLeadCustomerCreateAxios] = useState(null);
    const { response: leadCustomerCreateData, leadCustomerCreateError } = useAxios(leadCustomerCreatedAxioConfig);

    const [leadDetailAxioConfig, setLeadDetailAxios] = useState(null);
    const { response: leadData, errorLeadDetail } = useAxios(leadDetailAxioConfig);
    
    const [leadInteractionDetailAxioConfig, setLeadInteractionDetailAxios]=useState(null);
    const { response: leadInteractionData, errorLeadInteractionDetail } = useAxios(leadInteractionDetailAxioConfig);
    
    const navigate = useNavigate();
    const params = useParams();
    const leadId = params['*'];

    useEffect(() => {
        const fetchLeadDetails = async () => {
            setLeadDetailAxios({...LOGIN_AXIOS_CONFIG.GET, url:process.env.REACT_APP_API_URL + `/leads/${leadId}`});
            setLeadInteractionDetailAxios({...LOGIN_AXIOS_CONFIG.INT_GET, url:process.env.REACT_APP_API_URL + `/leads/${leadId}/interactions`});
        };
        fetchLeadDetails();
    }, [leadId]);

    const handleUpdateLead = async () => {
        setLeadUpdateAxios({...LOGIN_AXIOS_CONFIG.UPDATE, url:process.env.REACT_APP_API_URL + `/leads/${leadId}`, data:{status:status}});
    };

    useEffect(()=>{
        if (leadData) {
            setLead(leadData);
        }
    },[leadData])

    useEffect(()=>{
        if (leadInteractionData) {
            setInteractions(leadInteractionData);
        }
    },[leadInteractionData])

    useEffect(()=>{
        if (leadUpdateData) {
            setLead(leadUpdateData);
            setLeadUpdateAxios(null);
        }
    },[leadUpdateData])

    const handleCreateInteraction = async () => {
        setLeadInteractionCreateAxios({...LOGIN_AXIOS_CONFIG.INT_UPDATE, url:process.env.REACT_APP_API_URL + `/leads/${leadId}/interactions`, data:interactionFormData});
    };

    useEffect(()=>{
        if (leadInteractionCreateData) {
            setInteractions(leadInteractionCreateData);
            setInteractionFormData({ interaction_type: 'mail',comment: '' });
        }
    },[leadInteractionCreateData])
    

    const handleCreateCustomer = async () => {
        setLeadCustomerCreateAxios({...LOGIN_AXIOS_CONFIG.CUSTOMER, url:process.env.REACT_APP_API_URL + `/leads/${leadId}/customer`, data:customerFormData});
    };

    useEffect(()=>{
        if (leadCustomerCreateData) {
            navigate('/dashboard/customers');
            setCustomerFormData({});
        }
    },[leadCustomerCreateData])
    
    return (

        <section className="h-screen">
            <div className="h-full px-20 py-10">
                <div className="divide-y divide-gray-200">
                    <Typography variant="h2" color="blue-gray">Lead Management</Typography>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 mb-4">
                        <Card color="transparent" shadow={false}>
                            <Typography variant="h4" color="blue-gray"> Leads Details</Typography>
                            <p>Name: <Typography variant="h6" color="blue-gray"> {lead.name}</Typography></p>
                            <p>Email: <Typography variant="h6" color="blue-gray"> {lead.email}</Typography></p>
                            <p>Interests: <Typography variant="h6" color="blue-gray"> {lead.interests}</Typography></p>
                            <p>Status: <Typography variant="h6" color="blue-gray"> {lead.status}</Typography></p>
                        </Card>
                        <Card color="transparent" shadow={false}>
                            {lead.status != 'completed' ? (
                            <><Typography variant="h4" color="blue-gray"> Update Lead</Typography><form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Status
                                        </Typography>
                                        <Select
                                            name="status"
                                            value={status}
                                            onChange={(e) => { console.log(e); setStatus(e); } }
                                            placeholder=""
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            menuProps={{ className: "h-48" }}
                                        >
                                            {statuses.map(({ name }) => (
                                                <Option key={name} value={name}>
                                                    <div className="flex items-center gap-x-2">
                                                        {name}
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                        <Button className="mt-6" fullWidth onClick={handleUpdateLead}>
                                            Update Lead
                                        </Button>
                                    </div>
                                </form></>
                            ) : ""}
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 mb-4">
                        <Card color="transparent" shadow={false}>

                            <Typography variant="h4" color="blue-gray"> Interactions</Typography>

                            {interactions.length > 0 ? (
                            
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th key="date"  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Date</th>
                                        <th key="interaction_type"  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Interaction Type</th>
                                        <th key="comment" className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interactions.map((interaction) => (
                                        <tr key={interaction.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{interaction.created_at}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{interaction.interaction_type}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{interaction.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ) : (
                                <p>No interactions available.</p>
                            )}
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 mb-4">
                        <Card color="transparent" shadow={false}>

                            <Typography variant="h4" color="blue-gray"> Add Interaction</Typography>

                            <form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-1 flex flex-col gap-6">

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Interaction Type
                                    </Typography>
                                    <Select
                                        name="interaction_type"
                                        value={interactionFormData.interaction_type}
                                        onChange={(e) => {setInteractionFormData({...interactionFormData, interaction_type:e})}}
                                        placeholder=""
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                        className: "before:content-none after:content-none",
                                        }}
                                        menuProps={{ className: "h-48" }}
                                    >
                                        {interaction_types.map(({ name }) => (
                                        <Option key={name} value={name}>
                                            <div className="flex items-center gap-x-2">
                                            {name}
                                            </div>
                                        </Option>
                                        ))}
                                    </Select>

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Comment
                                    </Typography>
                                    <Textarea
                                        name="comment"
                                        value={interactionFormData.comment}
                                        onChange={(e) =>  {setInteractionFormData({...interactionFormData, comment:e.target.value})}}
                                        placeholder=""
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                        className: "before:content-none after:content-none",
                                        }}
                                        menuProps={{ className: "h-48" }}
                                    >
                                    </Textarea>

                                    
                                    <Button className="mt-6" fullWidth onClick={handleCreateInteraction}>
                                        Add Interaction
                                    </Button>
                                </div>
                            </form>
                        </Card>

                        {lead.status != 'completed' ? (
                            <>
                            <Card color="transparent" shadow={false}>

                                <Typography variant="h4" color="blue-gray"> Convert to Customer</Typography>

                                <form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Phone Number
                                        </Typography>
                                        <Input  
                                            name="phone_number"
                                            value={customerFormData.phone_number}
                                            onChange={(e) => {setCustomerFormData({...customerFormData, phone_number:e.target.value})}}
                                            size="lg"
                                            placeholder="+33XXXXXXXX"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                        />

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Address
                                        </Typography>
                                        <Textarea
                                            name="address"
                                            value={customerFormData.comment}
                                            onChange={(e) =>  {setCustomerFormData({...customerFormData, address:e.target.value})}}
                                            placeholder=""
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                            menuProps={{ className: "h-48" }}
                                        >
                                        </Textarea>

                                        
                                        <Button className="mt-6" fullWidth onClick={handleCreateCustomer}>
                                            Create Customer
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                            </>
                        ) : ""}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadsDetails;
