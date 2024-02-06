// src/components/Leads.js
import React, { useState, useEffect } from 'react';
import axiosConfig from '../utils/axiosConfig'; // Import the configured instance
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
// import { Link, useNavigate } from 'react-router-dom';
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["S No.", "Name", "Email", "Interests", "Update", "Delete"];
const DashboardHome = () => {
  const [dashboardData, setDashBoard] = useState([]);
  const [leadStatusCounts, setLeadStatusCounts] = useState([]);
  const [leadStatusStatuses, setLeadStatusStatuses] = useState([]);

  const [interactionCounts, setInteractionCounts] = useState([]);
  const [interactionCountNames, setInteractionCountNames] = useState([]);


  const [emailCounts, setEmailCounts] = useState([]);
  const [emailCountNames, setEmailCountNames] = useState([]);

  const [customerCreatedCounts, setCustomerCreatedCounts] = useState([]);
  const [customerCreatedCountNames, setCustomerCreatedCountNames] = useState([]);

  const fetchDashBoardData = async () => {
    try {
      const response = await axiosConfig.get(process.env.REACT_APP_API_URL + '/dashboard');
      setDashBoard(response.data);
      // console.log(response.data);

      // console.log(leadStatusStatuses);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  useEffect(() => {

    let leadStatusCountsTemp = [];
    let leadStatusStatusesTemp = [];
    if (dashboardData.leadStatusCounts) {
      Object.keys(dashboardData.leadStatusCounts).forEach((key) => {
        leadStatusStatusesTemp.push(dashboardData.leadStatusCounts[key].status);
        leadStatusCountsTemp.push(dashboardData.leadStatusCounts[key].count);
      });
      setLeadStatusCounts(leadStatusCountsTemp)
      setLeadStatusStatuses(leadStatusStatusesTemp)
    }
    // ApexCharts.exec('chartConfigLeadStatus', 'updateSeries', leadStatusCountsTemp)


    let interactionCountsTemp = [];
    let interactionCountNamesTemp = [];
    if (dashboardData.interactionCounts) {
      Object.keys(dashboardData.interactionCounts).forEach((key) => {
        interactionCountsTemp.push(dashboardData.interactionCounts[key].count);
        interactionCountNamesTemp.push(dashboardData.interactionCounts[key].interaction_type);
      });
      setInteractionCounts(interactionCountsTemp)
      setInteractionCountNames(interactionCountNamesTemp)
    }

    let emailCountsTemp = [];
    let emailCountNamesTemp = [];
    if (dashboardData.emailCounts) {
      Object.keys(dashboardData.emailCounts).forEach((key) => {
        emailCountsTemp.push(dashboardData.emailCounts[key].count);
        emailCountNamesTemp.push(dashboardData.emailCounts[key].date);
      });
      setEmailCounts(emailCountsTemp)
      setEmailCountNames(emailCountNamesTemp)
    }

    let customerCreatedCountsTemp = [];
    let customerCreatedCountNamesTemp = [];
    if (dashboardData.customerCreatedCounts) {
      Object.keys(dashboardData.customerCreatedCounts).forEach((key) => {
        customerCreatedCountsTemp.push(dashboardData.customerCreatedCounts[key].count);
        customerCreatedCountNamesTemp.push(dashboardData.customerCreatedCounts[key].date);
      });
      setCustomerCreatedCounts(customerCreatedCountsTemp)
      setCustomerCreatedCountNames(customerCreatedCountNamesTemp)
    }

  }, [dashboardData]);

  var chartConfigLeadStatus = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Leads",
        data: leadStatusCounts,
      },
    ],
    options: {
      chart: {
        id: 'chartConfigLeadStatus',
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: leadStatusStatuses,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
      noData: {
        text: 'Loading...'
      }
    },
  };

  var chartConfigInteractionCounts = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Interactions",
        data: interactionCounts,
      },
    ],
    options: {
      chart: {
        id: 'chartConfigInteractionCounts',
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: interactionCountNames,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
      noData: {
        text: 'Loading...'
      }
    },
  };

  var chartConfigEmailCounts = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Emails Sent",
        data: emailCounts,
      },
    ],
    options: {
      chart: {
        id: 'chartConfigEmailCounts',
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: emailCountNames,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
      noData: {
        text: 'Loading...'
      }
    },
  };

  var chartConfigCustomerCreatedCounts = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Emails Sent",
        data: customerCreatedCounts,
      },
    ],
    options: {
      chart: {
        id: 'chartConfigCustomerCreatedCounts',
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: customerCreatedCountNames,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
      noData: {
        text: 'Loading...'
      }
    },
  };

  return (

    <section className="h-screen">
      <div className="h-full px-20 py-10 mb-10">
        <div className="divide-y divide-gray-200">
          <Typography variant="h2" color="blue-gray">Dashboard</Typography>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <Card className="h-full w-full overflow-scroll">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-4">
                      {dashboardData.totalCustomers ? (
                        <>
                          <Card className="mt-6 mb-1 w-64">
                            <CardBody>
                              <Typography variant="h6" color="gray" className="mb-2">
                                Total Customers
                              </Typography>
                              <Typography variant="h4" color="black" className="">
                                {dashboardData.totalCustomers}
                              </Typography>
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                      {dashboardData.totalLeads ? (
                        <>
                          <Card className="mt-6 mb-1 w-64">
                            <CardBody>
                              <Typography variant="h6" color="gray" className="mb-2">
                                Total Leads
                              </Typography>
                              <Typography variant="h4" color="black" className="">
                                {dashboardData.totalLeads}
                              </Typography>
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                      {dashboardData.totalEmails ? (
                        <>
                          <Card className="mt-6 mb-1 w-64">
                            <CardBody>
                              <Typography variant="h6" color="gray" className="mb-2">
                                Total Emails Sent
                              </Typography>
                              <Typography variant="h4" color="black" className="">
                                {dashboardData.totalEmails}
                              </Typography>
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 mb-4">
                      {leadStatusCounts ? (
                        <>
                          <Card>
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                              <div className="w-max rounded-lg bg-gray-900 p-5 text-white mt-6">
                                <Square3Stack3DIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  Current Lead Status
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="max-w-sm font-normal"
                                >
                                </Typography>
                              </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0">
                              <Chart {...chartConfigLeadStatus} />
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                      {interactionCounts ? (
                        <>
                          <Card>
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                              <div className="w-max rounded-lg bg-gray-900 p-5 text-white mt-6">
                                <Square3Stack3DIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  Current Interactions
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="max-w-sm font-normal"
                                >
                                </Typography>
                              </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0">
                              <Chart {...chartConfigInteractionCounts} />
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 mb-4">
                      {emailCounts ? (
                        <>
                          <Card>
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                              <div className="w-max rounded-lg bg-gray-900 p-5 text-white mt-6">
                                <Square3Stack3DIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  Email Daily Report
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="max-w-sm font-normal"
                                >
                                </Typography>
                              </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0">
                              <Chart {...chartConfigEmailCounts} />
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}

                      {customerCreatedCounts && customerCreatedCountNames ? (
                        <>
                          <Card>
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                              <div className="w-max rounded-lg bg-gray-900 p-5 text-white mt-6">
                                <Square3Stack3DIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  Customer Conversions
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="max-w-sm font-normal"
                                >
                                </Typography>
                              </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0">
                              <Chart {...chartConfigCustomerCreatedCounts} />
                            </CardBody>
                          </Card>
                        </>
                      ) : ""}
                    </div>
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

export default DashboardHome;
