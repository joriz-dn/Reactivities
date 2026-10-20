import {Box, Paper, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import ProfileGallery from "./ProfileGallery.tsx";
import ProfileAbout from "./ProfileAbout.tsx";

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    return !(event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey);
}

export default function ProfileContent() {
    const [value, setValue] = useState(1);
    
    const tabContent = [
        {label: "About", content:<ProfileAbout />},
        {label: "Gallery", content: <ProfileGallery /> },
        {label: "Events", content:<div>Events</div>},
        {label: "Followers", content:<div>Followers</div>},
        {label: "Following", content:<div>Following</div>},
    ]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };

    return (
        <Box
            component={Paper}
            sx={{display:'flex', alignItems:'flex-start', borderRadius:1, mt:2, p:3, elevation:3, height:'auto', minHeight:500, flexDirection:'column' }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
            >
                {tabContent.map((item, index) => (
                <Tab key={index} label={item.label} sx={{mr:3}}>

                </Tab>
                ))}
            </Tabs>
            <Box sx={{mt: 3, width:'100%', height:'100%'}}>
                {tabContent[value].content}
            </Box>
        </Box>
    );
}
