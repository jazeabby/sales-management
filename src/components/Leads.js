// src/components/Leads.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';


const TABLE_HEAD = ["S No.", "Name", "Email", "Interests", "Update", "Delete"];
const Leads = () => {
  const [leads, setLeads] = useState([]);

  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const response = await axiosConfig.get(process.env.REACT_APP_API_URL + '/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLead = async (leadId) => {
    try {
      await axiosConfig.get(process.env.REACT_APP_API_URL + `/leads/${leadId}`);
      navigate('/dashboard/leads/'+leadId);
    } catch (error) {
      console.error('Error deleting lead:', error.message);
    }
  };
  const handleDeleteLead = async (leadId) => {
    try {
      await axiosConfig.delete(process.env.REACT_APP_API_URL + `/leads/${leadId}`);
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error.message);
    }
  };

  return (

    <section className="h-screen">
      <div className="h-full px-20 py-10">
        <div className="divide-y divide-gray-200">
          <Typography variant="h4" color="blue-gray">All Leads</Typography>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <Card className="h-full w-full overflow-scroll">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead, idx) => (
                          <tr key={lead.id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{lead.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{lead.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{lead.interests}</td>
                            <td className="whitespace-nowrap px-6 py-4">{lead.status}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Button color="blue" type="button" onClick={() => handleLead(lead._id)}>
                                Info
                              </Button>
                              <Button color="red" type="button" onClick={() => handleDeleteLead(lead._id)}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leads;
