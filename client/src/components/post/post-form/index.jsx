import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./tab-item";
import TextInputs from "./text-inputs";
import ImageUpload from "./image-upload";
import { ChevronDownIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { createPost } from "../../../api/posts";
import { getCommunities } from "../../../api/communities";
import { useNavigate } from "react-router-dom";
import { VscTerminalPowershell } from 'react-icons/vsc'


import Editor from '@monaco-editor/react'
import { languages, themes } from ".";
import { Code } from '@chakra-ui/react'

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
    icon: IoImageOutline,
  },
  {
    title: "<Code/>",
    icon: VscTerminalPowershell,
  },
];

export const PostForm = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    content: "",
  });
  const [community, setCommunity] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  const [lang, setLang] = useState("Choose a language")
  const [theme, setTheme] = useState("vs-dark")
  const [code, setCode] = useState("")



  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, [community, setCommunity]);

  const onTextChange = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleCreatePost = async () => {
    const data = await createPost({
      title: textInputs.title,
      content: textInputs.content,
      imageUrl: selectedFile,
      communityId: community,
      code : code
    });
    if (!data.error) {
      toast.success("Post created successfully!");
      navigate(`/explore`);
    } else {
      toast.error("Post failed to create!");
    }
  };

  const onMount = (editor) => {
    editor.current = editor;
    editor.focus();
  }


  return (
    <>
      <Select
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        placeholder="Choose a community"
        size={"md"}
        width={"fit-content"}
        onChange={(e) => setCommunity(e.target.value)}
      >
        {communities.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </Select>
      <Flex
        direction="column"
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius={4}
        mt={2}
      >
        <Flex width="100%">
          {formTabs.map((item, index) => (
            <TabItem
              key={index}
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Flex>
        <Flex p={4}>
          {selectedTab === "Post" && (
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={false}
            />
          )}
          {selectedTab === "Images" && (
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
              selectFileRef={selectFileRef}
            />
          )}

          {selectedTab === "<Code/>" && (
            <>
              <VStack width={"100%"}>
                <Flex gap={14}>

                  <Select
                    border={2}
                    borderStyle={"solid"}
                    borderColor={"gray.100"}
                    placeholder="Choose a language"
                    size={"sm"}
                    width={"fit-content"}
                    onClick={(e) => setLang(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Select>


                  <Select
                    border={2}
                    borderStyle={"solid"}
                    borderColor={"gray.100"}
                    placeholder={theme}
                    size={"sm"}
                    width={"fit-content"}
                    onClick={(e) => setTheme(e.target.value)}
                  >
                    {themes.map((th) => (
                      <option key={th.Value} value={th.Value}>
                        {th.Value}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Editor
                  height="20rem"
                  width="100%"
                  theme={theme}
                  language={lang}
                  onMount={onMount}
                  value={code}
                  onChange={(code) => { setCode(code) }}
                />


                <Icon as={VscTerminalPowershell} fontSize={20} flex={"flex-start"} />
                <Code width={"100%"} rounded={"xl"} p={4} bg={"#dce6ef"}>
                  <pre>{code}</pre>
                </Code>
              </VStack>
            </>
          )}

        </Flex>


      </Flex>
    </>
  );
};