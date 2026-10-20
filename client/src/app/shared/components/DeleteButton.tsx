import {Box, Button} from "@mui/material";
import {Delete, DeleteOutlined} from "@mui/icons-material";

function DeleteButton() {
    return (
        <Box sx={{position: 'relative'}}>
            <Button
                sx={{
                    opacity: 0.8,
                    transform: 'opacity 0.3s',
                    position: 'relative',
                    cursor: 'pointer',
                }}
            >
                <DeleteOutlined
                    sx={{
                        fontSize: '32',
                        color: 'white',
                        position: 'absolute',
                    }}
                />
                <Delete
                    sx={{
                        fontSize: '28',
                        color: '#ef5350',
                        p:0,
                        mx:0
                    }}
                />
            </Button>
        </Box>
    );
}

export default DeleteButton;