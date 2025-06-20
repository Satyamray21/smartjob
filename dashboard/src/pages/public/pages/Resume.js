import React, { useCallback, useState } from 'react';
import { Typography, Box, Toolbar, TextField, Grid, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadResume } from './../../../../reduxSlice/resumeSlice';
import { getDocument } from 'pdfjs-dist';

const ResumeUploader = () => {
    const dispatch = useDispatch();
    const [resumeData, setResumeData] = useState({
        name: '',
        email: '',
        designation: '',
        contact: '',
    });

    const formik = useFormik({
        initialValues: {
            resume: null,
            name: resumeData.data,
            email: resumeData.data,
            designation: resumeData.data,
            contact: resumeData.data
        },
        validate: (values) => {
            const errors = {};
            if (!values.resume) {
                errors.resume = 'Resume is required';
            } else if (values.resume.type !== 'application/pdf') {
                errors.resume = 'Only PDF files are allowed';
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('resume', values.resume);

            try {
                const response = await dispatch(uploadResume(formData)).unwrap();
                const { userId, name, designation, mail, contact } = response.data;

                // Displaying the extracted data (you can handle it as needed)
                console.log('User ID:', userId);
                console.log('Name:', name);
                console.log('Designation:', designation);
                console.log('Email:', mail);
                console.log('Contact:', contact);
                toast.success(response.message || 'Resume uploaded successfully!');

                // Set the extracted data to state
                setResumeData({ name, email: mail, designation, contact });
                resetForm();
            } catch (error) {
                console.error('Upload Error:', error);
                toast.error(error.response?.data?.message || 'Failed to upload resume');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const extractInfo = (text) => {
        const name = text.match(/Name:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || 'Not Found';
        const email = text.match(/Email:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)?.[1]?.trim() || 'Not Found';
        const designation = text.match(/Designation:\s*(.*)/i)?.[1]?.trim() || 'Not Found';
        const contact = text.match(/Contact:\s*(\+?\d+)/i)?.[1]?.trim() || 'Not Found';

        return { name, email, designation, contact };
    };

    // Function to parse PDF and extract data
    const parsePDF = async (file) => {
        const reader = new FileReader();
        reader.onload = async function () {
            try {
                const typedarray = new Uint8Array(this.result);
                const pdf = await getDocument(typedarray).promise;
                const page = await pdf.getPage(1);
                const textContent = await page.getTextContent();
                const text = textContent.items.map(item => item.str).join(' ');
                console.log('Extracted Text: ', text);
                const extractedData = extractInfo(text);
                setResumeData(extractedData);
            } catch (error) {
                console.error('Error parsing PDF:', error);
                toast.error('Failed to parse PDF. Please ensure it is a valid resume.');
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // Handling file drop
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue('resume', file);
        parsePDF(file).then(() => {
            if (!formik.errors.resume) {
                formik.handleSubmit();
            }
        });
    }, [formik]);

    // Setting up dropzone for file input
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf',
        maxFiles: 1,
    });

    return (
        <>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Box {...getRootProps()} sx={{ border: '2px dashed #a5d6a7', p: 2, textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Typography>Drop the file here...</Typography>
                    ) : (
                        <Typography>Drag & drop a PDF resume here, or click to select</Typography>
                    )}
                </Box>

                {formik.errors.resume && (
                    <Typography color="error" variant="body2">{formik.errors.resume}</Typography>
                )}

                {/* Text fields to display extracted data */}
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={resumeData.name}
                            onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={resumeData.email}
                            onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Designation"
                            variant="outlined"
                            fullWidth
                            value={resumeData.designation}
                            onChange={(e) => setResumeData({ ...resumeData, designation: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Contact"
                            variant="outlined"
                            fullWidth
                            value={resumeData.contact}
                            onChange={(e) => setResumeData({ ...resumeData, contact: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </>
    );
};

export default ResumeUploader;
