// import React, { useCallback, useState } from 'react';
// import { Typography, Box, Toolbar, TextField, Grid, Button, Stack, MenuItem, Select } from '@mui/material';
// import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
// import { useDropzone } from 'react-dropzone';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { uploadResume } from './../../../../reduxSlice/resumeSlice';
// import { createApplication } from '../../../../reduxSlice/applicantSlice';
// // Import PDF.js worker
// import * as pdfjsLib from 'pdfjs-dist';
// import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// const ResumeUploader = () => {
//     const dispatch = useDispatch();
//     const [resumeData, setResumeData] = useState({
//         name: '',
//         email: '',
//         designation: '',
//         contact: '',
//     });
//     const [fileName, setFileName] = useState(''); // To store the PDF file name
//     const [uploadedResume, setUploadedResume] = useState(null); // To store uploaded resume file

//     // Formik setup for applicant form
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             designation: '',
//             contact: '',
//             address: '',
//             fullAddress: '',
//             dob: '',
//             gender: '',
//             totalExperience: '',
//             relevantExperience: '',
//             currentCompany: ''
//         },
//         onSubmit: async (values, { setSubmitting, resetForm }) => {
//             setSubmitting(true);

//             try {
//                 // Submit both applicant and resume data
//                 const applicationResponse = await dispatch(createApplication({
//                     ...values,
//                     resume: uploadedResume,
//                 })).unwrap();

//                 toast.success(applicationResponse.message || 'Applicant created successfully!');
//                 resetForm();
//                 setUploadedResume(null); // Clear the uploaded resume after submission
//                 setFileName(''); // Clear the file name after submission
//             } catch (error) {
//                 toast.error(error.response?.data?.message || 'Failed to submit the application');
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     // Extracting info from PDF
//     const extractInfo = (text) => {
//         const name = text.match(/Name:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || '';
//         const email = text.match(/Email:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)?.[1]?.trim() || '';
//         const designation = text.match(/Designation:\s*(.*)/i)?.[1]?.trim() || '';
//         const contact = text.match(/Contact:\s*(\+?\d+)/i)?.[1]?.trim() || '';

//         return { name, email, designation, contact };
//     };

//     // Parsing PDF for resume data
//     const parsePDF = useCallback(async (file) => {
//         try {
//             const reader = new FileReader();
//             reader.onload = async () => {
//                 const typedarray = new Uint8Array(reader.result);
//                 const pdf = await pdfjsLib.getDocument(typedarray).promise;
//                 const page = await pdf.getPage(1);
//                 const textContent = await page.getTextContent();
//                 const text = textContent.items.map(item => item.str).join(' ');
//                 const extractedData = extractInfo(text);

//                 // Set the extracted values in the form
//                 formik.setValues(prevValues => ({
//                     ...prevValues,
//                     name: extractedData.name || prevValues.name,
//                     email: extractedData.email || prevValues.email,
//                     designation: extractedData.designation || prevValues.designation,
//                     contact: extractedData.contact || prevValues.contact,
//                 }));
//                 setResumeData(extractedData);
//             };
//             reader.readAsArrayBuffer(file);
//         } catch (error) {
//             toast.error('Failed to parse PDF. Please ensure it is a valid resume.');
//         }
//     }, [formik]);

//     // Handling file drop and upload resume
//     const onDrop = useCallback(async (acceptedFiles) => {
//         const file = acceptedFiles[0];
//         setFileName(file.name); // Set the PDF file name
//         setUploadedResume(file); // Store the uploaded resume file

//         try {
//             const formData = new FormData();
//             formData.append('resume', file);
//             const response = await dispatch(uploadResume(formData)).unwrap();
//             const { name, mail: email, designation, contact } = response.data;

//             // Auto-fill the form fields with response data
//             formik.setValues(prevValues => ({
//                 ...prevValues,
//                 name,
//                 email,
//                 designation,
//                 contact,
//             }));
//             setResumeData({ name, email, designation, contact });

//             // Parse the PDF for any additional data
//             parsePDF(file);
//         } catch (error) {
//             toast.error('Failed to upload resume.');
//         }
//     }, [dispatch, formik, parsePDF]);

//     // Dropzone setup
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: 'application/pdf',
//         maxFiles: 1,
//     });

//     // Gender options
//     const genderOptions = [
//         { value: 'male', label: 'Male' },
//         { value: 'female', label: 'Female' }
//     ];

//     return (
//         <>
//             <Toolbar />
//             <Box sx={{ background: '#ffffff', p: 2 }}>
//                 <Box {...getRootProps()} sx={{ border: '2px dashed #a5d6a7', p: 2, textAlign: 'center', cursor: 'pointer' }}>
//                     <input {...getInputProps()} />
//                     <Typography>{isDragActive ? 'Drop the file here...' : fileName || 'Drag & drop a PDF resume here, or click to select'}</Typography>
//                 </Box>

//                 {/* Personal Details */}
//                 <Grid container spacing={2} mt={2}>
//                     <Grid item xs={12}>
//                         <Typography variant="h5" textTransform="uppercase">Candidate Personal Details</Typography>
//                     </Grid>

//                     {['name', 'email', 'designation', 'contact'].map((field) => (
//                         <Grid item xs={12} md={6} key={field}>
//                             <Stack sx={{ p: 1, background: '#f0f0f0' }}>
//                                 <Typography>{field.charAt(0).toUpperCase() + field.slice(1)} *</Typography>
//                                 <TextField
//                                     fullWidth
//                                     value={formik.values[field]}
//                                     onChange={formik.handleChange}
//                                     name={field}
//                                     variant="outlined"
//                                 />
//                             </Stack>
//                         </Grid>
//                     ))}

//                     {/* Address, DOB, Gender */}
//                     {['address', 'fullAddress', 'dob'].map((field) => (
//                         <Grid item xs={12} md={6} key={field}>
//                             <Stack sx={{ p: 1, background: '#f0f0f0' }}>
//                                 <Typography>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} *</Typography>
//                                 <TextField
//                                     fullWidth
//                                     {...formik.getFieldProps(field)}
//                                     name={field}
//                                     variant="outlined"
//                                     type={field === 'dob' ? 'date' : 'text'}
//                                 />
//                             </Stack>
//                         </Grid>
//                     ))}
//                     <Grid item xs={12} md={6}>
//                         <Stack sx={{ p: 1, background: '#f0f0f0' }}>
//                             <Typography>Gender *</Typography>
//                             <Select
//                                 fullWidth
//                                 {...formik.getFieldProps('gender')}
//                                 size="small"
//                             >
//                                 {genderOptions.map(option => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </Stack>
//                     </Grid>

//                     {/* Employment Details */}
//                     <Grid item xs={12}>
//                         <Typography variant="h5" textTransform="uppercase">Employment Details</Typography>
//                     </Grid>
//                     {['totalExperience', 'relevantExperience', 'currentCompany'].map((field) => (
//                         <Grid item xs={12} md={4} key={field}>
//                             <Stack sx={{ p: 1, background: '#f0f0f0' }}>
//                                 <Typography>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} *</Typography>
//                                 <TextField
//                                     fullWidth
//                                     {...formik.getFieldProps(field)}
//                                     type={field === 'totalExperience' || field === 'relevantExperience' ? 'number' : 'text'}
//                                     variant="outlined"
//                                 />
//                             </Stack>
//                         </Grid>
//                     ))}

//                     <Grid item xs={12} md={4}>
//                         <Button onClick={formik.handleSubmit} variant="contained" fullWidth>Submit</Button>
//                     </Grid>
//                 </Grid>

//                 <ToastContainer position="top-center" />
//             </Box>
//         </>
//     );
// };

// export default ResumeUploader;



import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    Table, TableBody, TableCell, Stack, Box, OutlinedInput, TableContainer, TableHead,
    TableRow, Paper, Tooltip, Typography, useTheme, TablePagination, IconButton, Toolbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { fetchApplicationsByUserId } from '../../../../reduxSlice/applicantSlice';
import { fetchAllResume } from '../../../../reduxSlice/resumeSlice';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const ApplicationsList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { applications, loading: appLoading, error: appError } = useSelector((state) => state.APPLICATIONS);
    const { resumeData, loading: resumeLoading, error: resumeError } = useSelector((state) => state.RESUME);

    const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 20 });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log("user id findded by params", userId)
        if (userId) {
            dispatch(fetchApplicationsByUserId(userId));
        }
        dispatch(fetchAllResume());
    }, [dispatch, userId]);

    const mergedData = useMemo(() => {
        const appData = applications?.data || [];
        const resumes = resumeData?.resumes || [];

        return appData.map((application) => {
            const resume = resumes.find((res) => res.userId === application.userId);
            return {
                ...application,
                resumeId: resume?._id,
                resumeImage: resume?.profileImage,
            };
        });
    }, [applications?.data, resumeData?.resumes]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return mergedData;
        return mergedData.filter(item =>
            item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.resumeId?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [mergedData, searchTerm]);

    const handlePageChange = useCallback((event, newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setPagination({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    }, []);

    const slicedApplications = useMemo(() => {
        const { page, rowsPerPage } = pagination;
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, pagination]);

    if (appLoading || resumeLoading) {
        return (
            <Typography variant="body1" textAlign="center">
                Loading applications...
            </Typography>
        );
    }

    if (appError || resumeError) {
        return (
            <Typography variant="body1" textAlign="center" color="error">
                {appError || resumeError}
            </Typography>
        );
    }

    return (
        <>
            <Toolbar />
            <Box sx={{ height: '90vh', width: '100%', overflowY: 'scroll' }}>
                <Paper>
                    <Stack
                        direction="row"
                        sx={{
                            p: 2,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="h5">
                                Resume Details [{filteredData.length}]
                            </Typography>
                            <Typography variant="body2">
                                List of submitted resumes
                            </Typography>
                        </Box>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 20, 30]}
                            rowsPerPage={pagination.rowsPerPage}
                            page={pagination.page}
                            count={filteredData.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FDFDFD', border: '1px solid #eee' }}>
                            <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                            <OutlinedInput
                                size="small"
                                type="search"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Box>
                    </Stack>

                    <TableContainer sx={{ border: '1px solid #e0e0e0' }} component={Paper}>
                        <Table aria-label="resume table" size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                                    <TableCell align="center" sx={{ fontSize: '10px', color: '#FFF' }}>S.No.</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '10px', color: '#FFF' }}>Image</TableCell>
                                    <TableCell align="left" sx={{ fontSize: '10px', color: '#FFF' }}>Application Id</TableCell>
                                    <TableCell align="left" sx={{ fontSize: '10px', color: '#FFF' }}>Resume Id</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '10px', color: '#FFF' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slicedApplications.length > 0 ? (
                                    slicedApplications.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" sx={{ fontSize: '10px' }}>{index + 1 + pagination.page * pagination.rowsPerPage}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '10px' }}>
                                                <Box
                                                    component="img"
                                                    alt="Profile"
                                                    src={`${IMG_BASE_URL}uploads/${item?.resumeImage}`}
                                                    sx={{ width: '20px', height: '20px', borderRadius: '50%' }}
                                                />
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '10px' }}>{item?._id}</TableCell>
                                            <TableCell align="left" sx={{ fontSize: '10px' }}>{item?.resumeId}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '10px' }}>
                                                <Stack direction="row" justifyContent="center" spacing={1}>
                                                    <Tooltip title="View Resume">
                                                        <IconButton size="small" component={Link} to={`/viewresume/${item.resumeId}`}>
                                                            <VisibilityOutlinedIcon sx={{ color: '#1a237e', fontSize: '13px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit Resume">
                                                        <IconButton size="small" component={Link} to={`/updateresume/${item.resumeId}`}>
                                                            <EditOutlinedIcon sx={{ color: '#1b5e20', fontSize: '13px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ fontSize: '10px' }}>
                                            <Typography variant="body1">No applications found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default ApplicationsList;
