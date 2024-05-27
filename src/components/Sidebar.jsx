import {
  Box,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import bgImage from "../assets/bg.jpg";

import { NavLink } from "react-router-dom";

import { BiSolidBinoculars, BiSolidReport } from "react-icons/bi";
import { FaChartSimple } from "react-icons/fa6";
import { LuTable2 } from "react-icons/lu";

import { FiMenu } from "react-icons/fi";

import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const LinkItems = [
  { name: "Charts", icon: FaChartSimple, path: "/charts" },
  { name: "Tables", icon: LuTable2, path: "/tables" },
  { name: "Reports", icon: BiSolidReport, path: "/reports" },
  { name: "Forecast", icon: BiSolidBinoculars, path: "/forecast" },
  // { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      bgImg={bgImage}
      bgRepeat={"repeat"}
      bgSize={"contain"}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

function SidebarContent({ onClose, ...rest }) {
  return (
    <Box
      bg={useColorModeValue("#0005ff96", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        direction={"column"}
        boxSizing="border-box"
        justify={"space-between"}
        h={"100vh"}
      >
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Text
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
              color={"white"}
            >
              Dashboard
            </Text>
            <CloseButton
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
              color={"white"}
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
        </Box>

        <Divider my={10} />

        <Box mb={5}>
          <Flex direction={"column"} gap={2}>
            <Box>
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color="white"
                bg="#ffffff4d"
                _hover={{
                  bg: "#ffffff4d",
                  color: "white",
                }}
                {...rest}
              >
                <Flex align={"center"}>
                  <Icon
                    mr="4"
                    fontSize="26"
                    _groupHover={{
                      color: "white",
                    }}
                    as={FaRegUserCircle}
                  />
                  <Flex direction={"column"}>
                    <p>Satyajeet Rao</p>
                    <p>User</p>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color="white"
                bg="#ffffff4d"
                _hover={{
                  bg: "#ffffff4d",
                  color: "white",
                }}
                {...rest}
              >
                <Flex align={"center"}>
                  <Icon
                    mr="4"
                    fontSize="26"
                    _groupHover={{
                      color: "white",
                    }}
                    as={IoIosLogOut}
                  />
                  {"Logout"}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

function NavItem({ icon, children, path, ...rest }) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="white"
          bg={isActive ? "#ffffff4d" : "transparent"}
          _hover={{
            bg: "#ffffff4d",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Flex>
  );
}
