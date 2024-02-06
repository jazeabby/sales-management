// src/components/Leads.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Leads = () => {
    const [formData, setFormData] = useState({ name: '', email: '', interests: '' });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddLead = async () => {
        try {
            await axiosConfig.post(process.env.REACT_APP_API_URL + '/leads', formData);
            setFormData({ name: '', email: '', interests: '' });
            navigate('/dashboard/leads');

        } catch (error) {
            console.error('Error adding lead:', error.message);
        }
    };

    return (

        <section className="h-screen">
            <div className="h-full px-20 py-10">
                <div className="divide-y divide-gray-200">
                    <Typography variant="h4" color="blue-gray">Add Lead</Typography>

                    <Card color="transparent" shadow={false}>

                        <form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Name
                                </Typography>
                                <Input
                                    name="name"
                                    value={formData.name} onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Email
                                </Typography>
                                <Input
                                    name="email"

                                    value={formData.email} onChange={(e) => handleInputChange(e)}
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Interests
                                </Typography>
                                <Input
                                    name="interests"
                                    value={formData.interests} onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <Button className="mt-6" fullWidth onClick={handleAddLead}>
                                    Add Lead
                                </Button>
                            </div>
                        </form>
                    </Card>

                </div>
            </div>
        </section>
    );
};

export default Leads;
