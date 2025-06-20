import * as React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Button, Typography, IconButton,
    TableFooter, TablePagination, useTheme,
    Stack,
    Box,
    OutlinedInput
} from '@mui/material';
import {
    FirstPage as FirstPageIcon, KeyboardArrowLeft,
    KeyboardArrowRight, LastPage as LastPageIcon
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { jobApplicant } from '../../../apiData/sliderData';

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
};

const JobApplicant = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedjobApplicant = jobApplicant.sort((a, b) => a.calories < b.calories ? -1 : 1);
    const paginatedjobApplicant = rowsPerPage > 0
        ? sortedjobApplicant.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedjobApplicant;

    return (
        <>
            <Paper elevation={1} sx={{ m: 2 }}>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 2 }}>
                    <Box>
                        <Typography variant='h5'>
                            Application Submitted
                        </Typography>
                        <Typography variant='body2'>
                            List of Active Applications Submitted
                        </Typography>
                    </Box>
                    <Box sx={{ backgroundColor: '#FDFDFD', display: 'flex', px: 1, alignItems: 'center', border: '1px solid #eee' }}>
                        <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                        <OutlinedInput size='small' type="search" placeholder="Search here..." />
                    </Box>
                </Stack>
                <TableContainer >
                    <Table aria-label="job table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>Applicant Name</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Applicant Email</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Applicant Mobile Number</TableCell>
                                <TableCell sx={{ color: '#fff' }}>For Requisition</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Submitted Date</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Applicant Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedjobApplicant.map((job) => (
                                <TableRow key={job.job_id}>
                                    <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                        {job.applicant_name}
                                    </TableCell>
                                    <TableCell >
                                        <Typography sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
                                            <DifferenceOutlinedIcon sx={{ color: '#9e9e9e', fontSize: '15px' }} /> {job.applicant_email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
                                            <ContactPageIcon sx={{ color: '#9e9e9e', fontSize: '15px' }} />+91-{job.applicant_mobile}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {job.job_name}
                                        <Typography variant='body2'>Req ID: {job.job_id}</Typography>
                                    </TableCell>
                                    <TableCell>{job.applicant_date}</TableCell>
                                    <TableCell>
                                        <Button variant='contained' size='small' sx={{ height: '25px', background: '#4caf50' }}>Active</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={jobApplicant.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default JobApplicant;
