import { useState, useCallback } from 'react';
import { Box, Typography, Stack, Chip, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { DeleteForeverOutlined, SaveAltOutlined } from '@mui/icons-material';

const ResumeUploader = () => {
    const [fileName, setFileName] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [isDragActive, setIsDragActive] = useState(false);
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
            const format = selectedFile.name.split('.').pop();
            setFileFormat(format);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive: activeDrag } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        multiple: false,
    });

    const handleUpdateResume = () => {
        if (file) {
            // Logic to update the resume
            console.log('Updating resume with file:', file);
            // Call your API or perform the required action here
        } else {
            console.log('No file selected');
        }
    };

    return (
        <>
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Typography variant='h6'>Resume</Typography>
                    <Typography>Amit Kumar.pdf</Typography>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='body2'>Profile Last Update 2 Oct, 2024</Typography>
                        <Stack spacing={1} direction={'row'}>
                            <IconButton variant='contained' size='small'><SaveAltOutlined sx={{ fontSize: '20px' }} /></IconButton>
                            <IconButton variant='contained' size='small'><DeleteForeverOutlined sx={{ fontSize: '20px' }} /></IconButton>
                        </Stack>
                    </Stack>
                    <Box
                        {...getRootProps()}
                        sx={{
                            width: '100%',
                            borderRadius: '10px',
                            border: '2px dashed #a5d6a7',
                            p: 4,
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setIsDragActive(true)}
                        onMouseLeave={() => setIsDragActive(false)}
                    >
                        <input {...getInputProps()} />
                        <Chip
                            label="Upload Resume"
                            variant="outlined"
                            color="success"
                            sx={{ mb: 1 }}
                            onClick={handleUpdateResume}
                            disabled={!file}
                        />
                        <Typography>
                            {activeDrag
                                ? 'Drop the file here...'
                                : fileName
                                    ? `Selected: ${fileName} (${fileFormat.toUpperCase()})`
                                    : 'Drag & drop a PDF resume here, or click to select'}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </>
    );
};

export default ResumeUploader;
