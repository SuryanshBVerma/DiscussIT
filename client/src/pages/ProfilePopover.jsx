// ProfileInfoPopover.js
import { useState } from "react";
// import { Avatar, Button, Popover, PopoverHandler } from "@material-tailwind/react";
// import PopoverButton from "../components/ui/PopoverButton";
// import PopoverContentComponent from "../components/ui/PopoverContent";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Box,
} from "@chakra-ui/react";

import { Image, Text } from "@chakra-ui/react";
import { isLoggedIn, logoutUser } from "../utils/auth";

import { Avatar, Button, Typography } from "@material-tailwind/react";
import PopoverContentComponent from "../components/ui/PopoverContent";

function ProfilePopover() {
    const [openPopover, setOpenPopover] = useState(false);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    const user = isLoggedIn();

    return (
        // <Popover open={openPopover} handler={setOpenPopover}>
        //     <PopoverHandler {...triggers}>
        //         <Button>
        //             <Avatar size={"sm"} src={"./user.gif"} />
        //         </Button>
        //     </PopoverHandler>

        //     <PopoverContentComponent triggers={triggers}/>
        // </Popover>

        <Popover trigger="hover" placement={"bottom-start"}>
            <PopoverTrigger>
                <Box
                    as="a"
                    p={2}

                    fontSize={"10pt"}
                    fontWeight={500}
                    // color={linkColor}
                    _hover={{
                        textDecoration: "none",
                        color: "Red",
                    }}
                >
                    LABEL
                </Box>
            </PopoverTrigger>
            <PopoverContent
                border={0}
                boxShadow={"xl"}
                // bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
            >
                <PopoverContentComponent triggers={triggers}/>
            </PopoverContent>
        </Popover>
    );
}

export default ProfilePopover;


// as={"a"} href={`/users/${user.userId}`}