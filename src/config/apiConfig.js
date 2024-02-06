const ApiConfig = {
    "AUTH": {
        "LOGIN" : {
            "url": process.env.REACT_APP_API_URL+'/login',
            "method": 'POST',
        }
    },
    "LEAD": {

        "GET" : {
            "url": process.env.REACT_APP_API_URL+'/leads/',
            "method": 'GET',
        },
        "UPDATE" : {
            "url": process.env.REACT_APP_API_URL+'/leads',
            "method": 'PUT',
        },
        "INT_GET" : {
            "url": process.env.REACT_APP_API_URL+'/leads/interactions',
            "method": 'GET',
        },
        "INT_UPDATE" : {
            "url": process.env.REACT_APP_API_URL+'/leads/interactions',
            "method": 'POST',
        },
        "CUSTOMER" : {
            "method": "POST",
        }
    }
};

export default ApiConfig