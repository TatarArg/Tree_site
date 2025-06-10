import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
    return (
        <Container maxWidth="xl">
            <Box
                component="footer"
                sx={{
                    bgcolor: '#e0e0e0',
                    py: 2,
                    mt: 6,
                    borderRadius: 1,
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" sx={{ color: '#555' }}>
                    Самые высокие здания
                </Typography>
            </Box>
        </Container>
    );
}

export default Footer;
