import React, { useCallback, useState } from 'react';
import { Typography, Box, TextField, Grid, Button, Stack, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'; // Import Yup for validation
import { uploadResume } from './../../../../reduxSlice/resumeSlice';
import { createApplication } from '../../../../reduxSlice/applicantSlice';
// Import PDF.js worker
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const ResumeUploader = () => {
    const dispatch = useDispatch();
    const [resumeData, setResumeData] = useState({
        name: '',
        email: '',
        designation: '',
        contact: '',
    });
    const [fileName, setFileName] = useState(''); // To store the PDF file name
    const [uploadedResume, setUploadedResume] = useState(null); // To store uploaded resume file

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        designation: Yup.string().required('Designation is required'),
        contact: Yup.string().required('Contact is required'),
        address: Yup.string().required('Address is required'),
        full_address: Yup.string().required('Full Address is required'),
        dob: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
        total_experience: Yup.number().required('Total Experience is required'),
        relevant_experience: Yup.number().required('Relevant Experience is required'),
        current_company: Yup.string().required('Current Company is required'),
    });

    // Formik setup for applicant form
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            designation: '',
            contact: '',
            address: '',
            full_address: '',
            dob: '',
            gender: '',
            total_experience: '',
            relevant_experience: '',
            current_company: ''
        },
        validationSchema, // Attach validation schema
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            try {
                // Submit both applicant and resume data
                const applicationResponse = await dispatch(createApplication({
                    ...values,
                    resume: uploadedResume,
                })).unwrap();

                toast.success(applicationResponse.message || 'Applicant created successfully!');
                resetForm();
                setUploadedResume(null); // Clear the uploaded resume after submission
                setFileName(''); // Clear the file name after submission
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to submit the application');
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Extracting info from PDF
    const extractInfo = (text) => {
        const name = text.match(/Name:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || '';
        const email = text.match(/Email:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)?.[1]?.trim() || '';
        const designation = text.match(/Designation:\s*(.*)/i)?.[1]?.trim() || '';
        const contact = text.match(/Contact:\s*(\+?\d+)/i)?.[1]?.trim() || '';

        return { name, email, designation, contact };
    };

    // Parsing PDF for resume data
    const parsePDF = useCallback(async (file) => {
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const typedarray = new Uint8Array(reader.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                const page = await pdf.getPage(1);
                const textContent = await page.getTextContent();
                const text = textContent.items.map(item => item.str).join(' ');
                const extractedData = extractInfo(text);

                // Set the extracted values in the form
                formik.setValues(prevValues => ({
                    ...prevValues,
                    name: extractedData.name || prevValues.name,
                    email: extractedData.email || prevValues.email,
                    designation: extractedData.designation || prevValues.designation,
                    contact: extractedData.contact || prevValues.contact,
                }));
                setResumeData(extractedData);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            toast.error('Failed to parse PDF. Please ensure it is a valid resume.');
        }
    }, [formik]);

    // Handling file drop and upload resume
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFileName(file.name); // Set the PDF file name
        setUploadedResume(file); // Store the uploaded resume file

        try {
            const formData = new FormData();
            formData.append('resume', file);
            const response = await dispatch(uploadResume(formData)).unwrap();
            const { name, mail: email, designation, contact } = response.data;

            // Auto-fill the form fields with response data
            formik.setValues(prevValues => ({
                ...prevValues,
                name,
                email,
                designation,
                contact,
            }));
            setResumeData({ name, email, designation, contact });

            // Parse the PDF for any additional data
            parsePDF(file);
        } catch (error) {
            toast.error('Failed to upload resume.');
        }
    }, [dispatch, formik, parsePDF]);

    // Dropzone setup
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf',
        maxFiles: 1,
    });

    // Gender options
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    return (
        <>
            <Box sx={{ background: '#ffffff', p: 2 }}>
                <Box {...getRootProps()} sx={{ borderRadius: '10px', border: '2px dashed #a5d6a7', p: 4, textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <Typography>{isDragActive ? 'Drop the file here...' : fileName || 'Drag & drop a PDF resume here, or click to select'}</Typography>
                </Box>

                {/* Personal Details */}
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" textTransform="uppercase">Candidate Personal Details</Typography>
                    </Grid>

                    {['name', 'email', 'designation', 'contact'].map((field) => (
                        <Grid item xs={12} md={6} key={field}>
                            <Stack sx={{ p: 2, background: '#f0f0f0', borderRadius: '10px' }}>
                                <Typography>{field.charAt(0).toUpperCase() + field.slice(1)} *</Typography>
                                <TextField
                                    fullWidth
                                    sx={{ border: "1px solid #FDFDFD" }}
                                    value={formik.values[field]}
                                    onChange={formik.handleChange}
                                    name={field}
                                    variant="outlined"
                                    error={formik.touched[field] && Boolean(formik.errors[field])}
                                    helperText={formik.touched[field] && formik.errors[field]}
                                />
                            </Stack>
                        </Grid>
                    ))}

                    {/* Address, DOB, Gender */}
                    {['address', 'full_address', 'dob'].map((field) => (
                        <Grid item xs={12} md={6} key={field}>
                            <Stack sx={{ p: 2, background: '#f0f0f0', borderRadius: '10px' }}>
                                <Typography>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} *</Typography>
                                <TextField
                                    fullWidth
                                    sx={{ border: "1px solid #FDFDFD" }}
                                    {...formik.getFieldProps(field)}
                                    name={field}
                                    variant="outlined"
                                    type={field === 'dob' ? 'date' : 'text'}
                                    error={formik.touched[field] && Boolean(formik.errors[field])}
                                    helperText={formik.touched[field] && formik.errors[field]}
                                />
                            </Stack>
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6}>
                        <Stack sx={{ p: 2, background: '#f0f0f0', borderRadius: '10px' }}>
                            <Typography>Gender *</Typography>
                            <Select
                                fullWidth
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                name="gender"
                                variant="outlined"
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                            >
                                {genderOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>

                    {/* Experience Fields */}
                    {['total_experience', 'relevant_experience', 'current_company'].map((field) => (
                        <Grid item xs={12} md={4} key={field}>
                            <Stack sx={{ p: 2, background: '#f0f0f0', borderRadius: '10px' }}>
                                <Typography>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} *</Typography>
                                <TextField
                                    fullWidth
                                    sx={{ border: "1px solid #FDFDFD" }}
                                    {...formik.getFieldProps(field)}
                                    type={field === 'total_experience' || field === 'relevant_experience' ? 'number' : 'text'}
                                    variant="outlined"
                                />
                            </Stack>
                        </Grid>
                    ))}

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={formik.handleSubmit}
                            disabled={formik.isSubmitting}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </>
    );
};

export default ResumeUploader;
