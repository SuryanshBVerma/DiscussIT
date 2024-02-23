import React, { useState, useEffect } from 'react';
import { Input, Stack } from '@chakra-ui/react';

const Options = ({ count, setPollOpt, pollOpt}) => {
    const [options, setOptions] = useState(pollOpt);


    // Update state when count changes
    useEffect(() => {
        setOptions(prevOptions => {
            // Preserve existing values for existing options
            const updatedOptions = { ...prevOptions };
            // Initialize new options with a default value of 0
            for (let i = Object.keys(prevOptions).length + 1; i <= count; i++) {
                updatedOptions[i] = '';
            }
            // Remove the last option if count is decreased
            for (let i = Object.keys(prevOptions).length; i > count; i--) {
                delete updatedOptions[i];
            }
            // Update parent component with new options
            setPollOpt(updatedOptions);
            return updatedOptions;
        });
    }, [count]);

    const handleChange = (event, index) => {
        const { value } = event.target;
        setOptions(prevOptions => ({
            ...prevOptions,
            [index]: value
        }));

        setPollOpt(options) // Added this line
        // console.log(options);
    };


    return (
        
        <Stack spacing={5}>
            {Array.from({ length: count }, (_, index) => index + 1).map((index) => (
                <Input
                    key={index}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "black",
                    }}
                    fontSize="10pt"
                    borderRadius={4}
                    placeholder="Option"
                    isRequired
                    value={options[index] || ''}
                    onChange={(event) => handleChange(event, index)}
                    onBlur={(event) => handleChange(event, index)}
                />
            ))}
        </Stack>
    );
};

export default Options;
