import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  Flex,
  SimpleGrid
} from "@chakra-ui/react";
import Typed from 'typed.js';
import React, { useEffect, useRef } from 'react';
import { FcBullish, FcCollaboration } from "react-icons/fc";
import { MdOutlineGroups } from "react-icons/md";
import { Layout } from "../components/layout";
import usePageMeta from "../utils/meta";

const Feature = ({ title, text, icon }) => {
  usePageMeta();
  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        // color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}

      </Flex>
      <Text fontWeight={600} color={"white"}>{title}</Text>
      <Text color={"gray.400"}>{text}</Text>
    </Stack>
  );
};

export default Feature;

export const Homepage = () => {

  const typeDataRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Students",
        "Developers",
        "Entrepreneurs",
        "Programmers",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    };


    typeDataRef.current = new Typed(".role", options);

    // Cleanup function to destroy Typed instance when the component is unmounted
    return () => {
      if (typeDataRef.current) {
        typeDataRef.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>

      <Container maxW={"4xl"}
        // height={"auto"}
        height={"100vh"}
      >
        <Stack
          as={"Box"}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 16, md: 28 }}
        >

          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          >
            Empowering <span className="role"></span>

            <br />
            <Text as={"span"} color={"#7f4ccd"}>
              with Collaborative Learning
            </Text>
          </Heading>
          <Text color={"gray.500"} mx={"auto"}>
            A Dynamic Platform for Programmers: Fostering Collaborative Learning
            through Programming Question Posting and Knowledge Sharing{" "}
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"#7f4ccd"}
              rounded={"full"}
              px={6}
              as={"a"}
              href="/explore"
              _hover={{ bg: "#5b2d9f" }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box bg={"#50288c"} py={{ base: 10, md: 24 }} px={{ base: 4, md: 16 }} mb={{ base: 4, md: 60 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "3xl", md: "5xl" }}
          lineHeight={"110%"}
          textAlign={"center"}
          textColor={"whitesmoke"}
        >
          Features
        </Heading>
        <SimpleGrid
          py={{ base: 6, md: 12 }}
          columns={{ base: 1, md: 3 }}
          spacing={10}
          mt={4}
        >
          <Feature
            icon={<Icon as={MdOutlineGroups} w={10} h={10} />}
            title={"Community Engagement"}
            text={
              "Join vibrant communities, share insights, and embark on a collective journey of knowledge. Discover a space where ideas thrive and connections flourish!"
            }
          />
          <Feature
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            title={"Doubt Support"}
            text={
              "Navigate challenges seamlessly with our dedicated Doubt Support. Empower your learning experience, ask questions, and embark on a journey of clarity and understanding!"
            }
          />
          <Feature
            icon={<Icon as={FcBullish} w={10} h={10} />}
            title={"Peer to Peer Learning"}
            text={
              "Experience the power of collaborative learning! Dive into a world where peers inspire peers, and knowledge transcends boundaries."
            }
          />
        </SimpleGrid>
      </Box>
    </Layout>
  );
};
