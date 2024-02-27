import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Progress } from '@chakra-ui/react'
import { BASE_URL } from '../../../config'
import { isLoggedIn } from '../../../utils/auth'
import { Navigate } from 'react-router-dom'
// import { polls } from '../constants/poll'

const Poll = ({ title, options, postId}) => {


    const [value, setValue] = useState('')
    const user = isLoggedIn();
    const [isDisabled, setIsDisabled] = useState( user ? false : true) 
    


    const getPollVoters =  async () => {
        try{
            const response = await fetch(`${BASE_URL}api/posts/${postId}/poll`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": user.token,
                }
            });
            const data = await response.json();

            if (data.poll && data.poll.voters.includes(user.userId)) {
                setIsDisabled(true);
            }
        }catch(err){
            console.log("Poll Update : ", err);
        }
    }

    useEffect(() => {
        if (user) {
            getPollVoters();
        }

        
    }, [])


    const handelProgress = (value) => {
        var total = 0;
        Object.entries(options).map(([opt, otpValue]) => (
            total += parseInt(otpValue)
        ))

        return total !== 0 ? parseFloat((value / total * 100)).toFixed(1) : 0
    };

    const updatePoll = async (value, postId) => {

        const user = isLoggedIn();
                if (!user) {
                    return new Error("User not logged in");
                }
                try {
                    const response = await fetch(`${BASE_URL}api/posts/${postId}/poll`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "x-access-token": user.token,
                        },
                        body: JSON.stringify({
                            value: value
                        }),
                    });
                    const data = await response.json();
                    console.log(data.poll);
                    setIsDisabled(true)
                    
                    Navigate(`/explore`);
                } catch (err) {
                    console.log("Poll Update : ", err);
                }
    }

    useEffect(() => {
        console.log(value);
        if (value) {
            updatePoll(value, postId);
        }
    }, [value]);



    return (
        <Box p={5} rounded={"xl"} m={4} bg={"#dce6ef"}>
            {title}
            <br /><br />
            <Stack>
                <RadioGroup onChange={setValue} isDisabled={isDisabled}>
                    {Object.entries(options).map(([opt, value]) => (

                        <Stack key={opt}>
                            <Radio value={opt} size={"sm"} onClick={""}>
                                {opt}&nbsp;
                                ({handelProgress(value)}%)
                            </Radio>
                            <Progress colorScheme={'blue'} size='sm' value={handelProgress(value)} rounded={'xl'} />
                        </Stack>

                    ))}
                </RadioGroup>
            </Stack>

        </Box>

    )
}

export default Poll
