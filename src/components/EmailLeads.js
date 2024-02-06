// src/components/EmailLeads.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Alert, Button, Card, Input, List, ListItem, Textarea, Typography } from '@material-tailwind/react';


const EmailLeads = () => {
    const [pendingLeads, setPendingLeads] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [emailFormData, setEmailFormData] = useState({
        to: '',
        cc: '',
        bcc: '',
        content: '',
        subject: '',
    });

    const errorDiv = error 
    ? <Alert className="mb-2" color="red">
        Something went wrong
      </Alert> 
    : success ? <Alert className="mb-2" color="green">
        Emails Sent!
    </Alert> : "";

    useEffect(() => {
        const fetchPendingLeads = async () => {
            try {
                const response = await axiosConfig.get(process.env.REACT_APP_API_URL + '/leads?status=pending');
                setPendingLeads(response.data);
                
            } catch (error) {
                console.error('Error fetching pending leads:', error.message);
            }
        };

        fetchPendingLeads();
    }, []);

    const handleSendEmail = async () => {
        try {
            let lead_ids = pendingLeads.map((lead) => lead._id);
            // console.log(pendingLeads);
            // console.log(lead_ids);
            await axiosConfig.post(process.env.REACT_APP_API_URL + '/send-emails', {
                leads: pendingLeads.map((lead) => lead._id),
                cc: emailFormData.cc,
                bcc: emailFormData.bcc,
                subject: emailFormData.subject,
                content: emailFormData.content,
            });
            setSuccess(true);
            // Clear the email form data
            setEmailFormData({ to: '', cc: '', bcc: '', content: '', subject:'' });
        } catch (error) {
            setError(true);
            console.error('Error sending emails:', error.message);
        }
    };

    useEffect(()=>{
        if (error) {
            setError(true);
        } 
    },[error]);

    useEffect(()=>{
        if (success) {
            setSuccess(true);
        } 
    },[success]);


    return (

        <section className="h-screen">
            <div className="h-full px-20 py-10">
                <div className="divide-y divide-gray-200">
                    {errorDiv}
                    <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <Typography variant="h4" color="blue-gray"> Pending Email Leads</Typography>

                            <Card className="w-96">
                                <List>
                                {pendingLeads.map((lead) => (
                                    <ListItem>{lead.email}</ListItem>
                                ))}
                                </List>
                            </Card>
                        </div>
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                            <Card color="transparent" shadow={false}>
                                <Typography variant="h4" color="blue-gray"> Send Marketing Emails</Typography>
                                
                                <form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                                    <div className="mb-1 flex flex-col gap-6">
                                        {/* <label>To:</label> */}
                                        {/* <input type="text" value={emailFormData.to} onChange={(e) => setEmailFormData({ ...emailFormData, to: e.target.value })} /> */}

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Subject:
                                        </Typography>
                                        
                                        <Input  
                                            name="subject"
                                            type="text"
                                            value={emailFormData.subject}
                                            onChange={(e) => {setEmailFormData({...emailFormData, subject:e.target.value})}}
                                            size="lg"
                                            placeholder="Subject"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            CC:
                                        </Typography>
                                        
                                        <Input  
                                            name="cc"
                                            type="text"
                                            value={emailFormData.cc}
                                            onChange={(e) => {setEmailFormData({...emailFormData, cc:e.target.value})}}
                                            size="lg"
                                            placeholder="a@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                        />

                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            BCC:
                                        </Typography>

                                        <Input  
                                            name="bcc"
                                            type="text"
                                            value={emailFormData.bcc}
                                            onChange={(e) => {setEmailFormData({...emailFormData, bcc:e.target.value})}}
                                            size="lg"
                                            placeholder="a@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Content:
                                        </Typography>

                                        <Textarea
                                            name="content"
                                            value={emailFormData.content}
                                            onChange={(e) =>  {setEmailFormData({...emailFormData, content:e.target.value})}}
                                            placeholder=""
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                            className: "before:content-none after:content-none",
                                            }}
                                            menuProps={{ className: "h-48" }}
                                        >
                                        </Textarea>

                                        <Button className="mt-6" fullWidth onClick={handleSendEmail}>
                                            Send Emails
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailLeads;
