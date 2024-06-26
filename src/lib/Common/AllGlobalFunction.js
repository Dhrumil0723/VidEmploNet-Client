import moment from 'moment'

// SingUp Options
export const signUpOptions = [
    { value: 'candidate', label:'Candidate' },
    { value: 'recruiter', label:'Recruiter' }
]

// Working Mode Options
export const workingModeOptions = [
    { value: 'Remote', label:'Remote' },
    { value: 'On-site', label:'On-site' },
    { value: 'Hybrid', label:'Hybrid' }
]

// Job Type Options
export const jobTypeOptions = [
    { value: 'Full-time', label:'Full-time' },
    { value: 'Part-time', label:'Part-time' }
]

// Education Stream Options
export const educationStreamOptions = [
    { value: 1, label:'Engineering' },
    { value: 2, label:'Commerce'} 
]

// Course Options
export const courseOptions = [
    { value: 'BE-IT', label:'BE-IT', educationStreamId:'1' },
    { value: 'BSc-IT', label:'BSc-IT', educationStreamId:'1' },
    { value: 'BCA', label:'BCA', educationStreamId:'1' },
    { value: 'MSc-IT', label:'MSc-IT', educationStreamId:'1' },
    { value: 'MTech-IT', label:'MTech-IT', educationStreamId:'1' },
    { value: 'BE-CE', label:'BE-CE', educationStreamId:'1' },
    { value: 'BSc-CE', label:'BSc-CE', educationStreamId:'1' },
    { value: 'MSc-CE', label:'MSc-CE', educationStreamId:'1' },
    { value: 'MTech-CE', label:'MTech-CE', educationStreamId:'1' },
    { value: 'BSc-ICT', label:'BSc-ICT', educationStreamId:'1' },
    { value: 'BE-ICT', label:'BE-ICT', educationStreamId:'1' },
    { value: 'BBA-ICT', label:'BBA-ICT', educationStreamId:'1' },
    { value: 'BCom', label:'BCom', educationStreamId:'2' },
    { value: 'BBA', label:'BBA', educationStreamId:'2' },
    { value: 'BMS', label:'BMS', educationStreamId:'2' },
    { value: 'BCom-IB', label:'BCom International Business', educationStreamId:'2' },
    { value: 'BCom-Accounting', label:'BCom Accounting', educationStreamId:'2' },
    { value: 'BCom-Finance', label:'BCom Finance', educationStreamId:'2' },
    { value: 'BCom-Management', label:'BCom Management', educationStreamId:'2' },
    { value: 'BCom-Entrepreneurship', label:'BCom Entrepreneurship', educationStreamId:'2' },
];

// County Options
export const countryOptions = [
    { value: 'India', label: 'India' }
]

// State Options
export const stateOptions = [
    { value: 'Gujarat', label: 'Gujarat' }
]

// City Options
export const cityOptions = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Surat', label: 'Surat' },
    { value: 'Vadodara', label: 'Vadodara' },
    { value: 'Rajkot', label: 'Rajkot' }
]

// Select Time options 
export const selectTimeOptions = [
    { value: '30 sec', label: '30 sec'},
    { value: '1 min', label: '1 min'},
    { value: '2 min', label: '2 min'},
]

// Select Page size options
export const pageSizeOptions = [
    { value: '1', label: '1' },
    { value: '3', label: '3' },
    { value: '6', label: '6' },
    { value: '12', label: '12' }
]

// Select Type Of Company Options
export const typeOfCompanyOptions = [
    { value: 'Service', label: 'Service' },
    { value: 'Product', label: 'Product' }
]

// Select Employees Options
export const employeesOptions = [
    { value: '1 - 10', label: '1 - 10' },
    { value: '10 - 50', label: '10 - 50' },
    { value: '50 - 100', label: '50 - 100' },
    { value: '100 - 200', label: '100 - 200' },
    { value: '200 - 500', label: '200 - 500' },
    { value: '500 +', label: '500 +' }
]

// Select Posted Time Options
export const timeOptions = [
    { value: 'PastMonth', label: 'Past Month' },
    { value: 'PastWeek', label: 'Past Week' },
    { value: 'Past24Hours', label: 'Past 24 Hours' },
]

// Select User Status Options
export const userStatusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
]

// DateTime formatting function
export const dateTimeFormat = (jobCreatedAt) => {
    let difference = {
        value: null,
        type: null,
    };

    difference.value = moment().diff(jobCreatedAt, "months");
    difference.type = "Months";

    if (difference.value < 1) {
        difference.value = moment().diff(jobCreatedAt, "days");
        difference.type = "Days";
        
        if (difference.value < 1) {
            difference.value = moment().diff(jobCreatedAt, "hours");
            difference.type = "Hours";
        }
    }
    return(`${difference.value} ${difference.type} ago`);
}

// Select Pagination Limit Options
export const paginationLimitOptions = [
    {value: '10', label: '10'},
    {value: '20', label: '20'},
    {value: '30', label: '30'},
    {value: '50', label: '50'},
    {value: '100', label: '100'},

]