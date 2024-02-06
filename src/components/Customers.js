// src/components/customers.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';


const TABLE_HEAD = ["S No.", "Name/Email", "Phone Number/Address", "Interests", "Status", "Delete"];
const Customers = () => {
  const [Customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await axiosConfig.get(process.env.REACT_APP_API_URL + '/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching Customers:', error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomer = async (customerId) => {
    try {
      await axiosConfig.get(process.env.REACT_APP_API_URL + `/customers/${customerId}`);
      navigate('/dashboard/customers/'+customerId);
    } catch (error) {
      console.error('Error deleting Customer:', error.message);
    }
  };
  const handleDeleteCustomer = async (customerId) => {
    try {
      await axiosConfig.delete(process.env.REACT_APP_API_URL + `/customers/${customerId}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting Customer:', error.message);
    }
  };

  return (

    <section className="h-screen">
      <div className="h-full px-20 py-10">
        <div className="divide-y divide-gray-200">
          <Typography variant="h2" color="blue-gray">Customer Management</Typography>

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
                        {Customers.map((customer, idx) => (
                          <tr key={customer.id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {customer.name} <br />{customer.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {customer.phone_number} <br />{customer.address}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{customer.interests}</td>
                            <td className="whitespace-nowrap px-6 py-4">{customer.status}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Button color="red" type="button" onClick={() => handleDeleteCustomer(customer._id)}>
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

export default Customers;
