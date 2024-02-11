import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TravelVideo = () => {
    const videoId = 'uot_VH42ZaY';
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2, maxWidth: '93%', mx: 'auto' }}>
            <Typography variant="h5" gutterBottom sx={{textAlign: 'center'}}>
                Исследуйте мир с NomadNotes
            </Typography>
            <Box
                sx={{
                    position: 'relative',
                    height: 0,
                    overflow: 'hidden',
                    paddingTop: '56.25%',
                    marginTop: '20px',
                }}
            >
                <iframe
                    src={videoUrl}
                    title="Travel Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                ></iframe>
            </Box>
        </Paper>
    );
};

export default TravelVideo;
