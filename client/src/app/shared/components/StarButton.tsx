import {Box, Button} from "@mui/material";
import {StarBorderRounded, StarRounded} from "@mui/icons-material";

type Props = {
    selected: Boolean
}

function StarButton({ selected }: Props) {
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
                <StarBorderRounded 
                    sx={{
                        fontSize: '32',
                        color: 'white',
                        position: 'absolute',
                    }}
                />
                <StarRounded
                    sx={{
                        fontSize: '28',
                        color: selected ? '#42a5f5' : 'rgba(0,0,0,0.5)',
                        p:0,
                        mx:0
                    }}
                />
            </Button>
        </Box>
    );
}

export default StarButton;