import { Box, Flex } from "@chakra-ui/react";

const SecondaryLayout = ({ children, maxWidth }) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex
        width="95%"
        justify="center"
        maxWidth={maxWidth || "1260px"}
        borderRadius="lg" // Add rounded borders to the entire container
        overflow="hidden" // Hide overflow for rounded corners
        spacing={{ base: 4, md: 8 }} // Adjust spacing between the two columns
      >
        <Flex
          direction="column"
          width={{ base: "100%", md: "70%" }}
          mr={{ base: 0, md: 4 }} // Adjust margin-right for the left column
          borderRadius="lg" // Add rounded borders to the left column
          overflow="hidden" // Hide overflow for rounded corners
        >
          {children && children[0]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
          borderRadius="xl" // Add rounded borders to the right column
          overflow="hidden" // Hide overflow for rounded corners
        >
          {children && children[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SecondaryLayout;
