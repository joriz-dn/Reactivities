import {type SyntheticEvent, useState} from "react";
import {Box, Paper, Tab, Tabs} from "@mui/material";

function ProfileVerticalContent() {
    const [value, setValue] = useState(0);
    const handleChange = (_: SyntheticEvent, newValue:number) => {
        setValue(newValue);
    }
    
    const tabContent = [
        {label: "About", content:<div>About</div>},
        {label: "Gallery", content:<div>Gallery</div>},
        {label: "Events", content:<div>Events</div>},
        {label: "Followers", content:<div>Followers</div>},
        {label: "Following", content:<div>Following</div>},
    ]
    return (
        <Box
            component={Paper}
            sx={{display:'flex', alignItems:'flex-start', borderRadius:1, mt:2, p:3, elevation:3, height:500 }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{borderRight: 1, height:450, minWidth:200}}
            >
                {tabContent.map((item, index) => (
                    <Tab key={index} label={item.label} sx={{mr:3}}>
                        
                    </Tab>
                ))}
            </Tabs>
            <Box sx={{flexGrow: 1, p: 3}}>
                {tabContent[value].content}
            </Box>
        </Box>
    );
}

export default ProfileVerticalContent;