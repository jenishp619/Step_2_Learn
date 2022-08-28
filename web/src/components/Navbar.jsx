/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReactSession } from "react-client-session";
import {
  AiTwotoneAppstore,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineReconciliation,
  AiOutlineSearch,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { FaVolumeUp } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { RiCalendarEventFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isLargerThan1280] = useMediaQuery("(min-width: 991px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  var user = ReactSession.get("user");
  user = user && JSON.parse(user);

  const RenderLink = () => {
    /**
     * Created useNavigate hook to navigate to different page.
     */

    const navigate = useNavigate();

    return (
      <Flex flexDirection="column" justifyContent="space-evenly">
        <Link to="/">
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname === "/" ? "#0AF" : ""}
            fontWeight={location.pathname === "/" ? "bold" : ""}
            id="feed"
          >
            <AiOutlineHome size={25} />
            <Text mx="3">Feed</Text>
          </Flex>
        </Link>

        <Link
          to="/search"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("search") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("search") ? "bold" : ""}
            id="search"
          >
            <AiOutlineSearch size={25} />
            <Text mx="3">Search</Text>
          </Flex>
        </Link>

        <Link to={`/profile/${user.user.id}`}>
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("profile") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("profile") ? "bold" : ""}
            id="profile"
          >
            <AiOutlineUser size={25} />
            <Text mx="3">Profile</Text>
          </Flex>
        </Link>
        <Link
          to="/blog"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("blog") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("blog") ? "bold" : ""}
            id="profile"
          >
            <AiOutlineReconciliation size={25} />
            <Text mx="3">Blog</Text>
          </Flex>
        </Link>
        <Link
          to="/roadmap/templates"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("roadmap") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("roadmap") ? "bold" : ""}
            id="roadmap"
          >
            <AiTwotoneAppstore size={25} />
            <Text mx="3">Roadmap</Text>
          </Flex>
        </Link>

        <Link
          to="/favorite"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("favorite") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("favorite") ? "bold" : ""}
            id="fav"
          >
            <AiOutlineStar size={25} />
            <Text mx="3">Favorite</Text>
          </Flex>
        </Link>
        <Link
          to="/notification"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("notification") ? "#0AF" : ""}
            fontWeight={
              location.pathname.includes("notification") ? "bold" : ""
            }
          >
            <FaVolumeUp size={25} />
            <Text mx="3">Notification</Text>
          </Flex>
        </Link>

        <Link
          to="/event"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("event") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("event") ? "bold" : ""}
            id="event"
          >
            <RiCalendarEventFill size={25} />
            <Text mx="3">Event</Text>
          </Flex>
        </Link>

        <Link
          to="/notes"
          className={
            user && user.user && user.user.isPaidUser ? "" : "link-disabled"
          }
        >
          <Flex
            align="center"
            p="3"
            borderRadius="3xl"
            color={location.pathname.includes("notes") ? "#0AF" : ""}
            fontWeight={location.pathname.includes("notes") ? "bold" : ""}
            id="fav"
          >
            <CgNotes size={25} />
            <Text mx="3">Notes</Text>
          </Flex>
        </Link>

        {!user ? (
          <Link to="/auth">
            <Flex
              align="center"
              p="3"
              borderRadius="3xl"
              color={location.pathname === "/auth" ? "#0AF" : ""}
              fontWeight={location.pathname === "/auth" ? "bold" : ""}
            >
              <FiLogIn size={25} />
              <Text mx="3">SignIn / SignUp</Text>
            </Flex>
          </Link>
        ) : (
          <Flex
            onClick={() => {
              ReactSession.remove("user");
              navigate("/auth");
            }}
            align="center"
            p="3"
            borderRadius="3xl"
            color="red"
            cursor="pointer"
          >
            <FiLogIn size={25} />
            <Text mx="3">Logout</Text>
          </Flex>
        )}
      </Flex>
    );
  };

  if (!isLargerThan1280) {
    return (
      <>
        <Flex
          w="100vw"
          h={["10vh", "10vh", "5vh"]}
          justify="space-between"
          align="center"
          p="3"
          shadow="md"
        >
          <Link to="/">
            <Text>Step To Learn</Text>
          </Link>
          <Box cursor="pointer">
            <AiOutlineMenu size={25} onClick={onOpen} />
          </Box>
        </Flex>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Step To Learn</DrawerHeader>

            <DrawerBody>
              <RenderLink />
            </DrawerBody>

            {/* {

          Create darkMode Switch and attached necessary function to it.

          } */}

            <DrawerFooter>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="dark-mode" mb="0" id="darkmodelabel">
                  Dark Mode?
                </FormLabel>
                <Switch
                  id="dark-mode"
                  value={colorMode === "light" ? true : false}
                  onChange={() => toggleColorMode()}
                />
              </FormControl>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  } else {
    return (
      <Flex
        w="20%"
        h="100vh"
        position="sticky"
        top="0"
        left="0"
        p="3"
        flexDirection="column"
        justifyContent="space-between"
        shadow="2xl"
      >
        <Link to="/">
          <Text fontSize="3xl" id="name" h="5vh">
            Step To Learn
          </Text>
        </Link>

        <Flex h="80vh">
          <RenderLink />
        </Flex>

        {/* {

          Create darkMode Switch and attached necessary function to it.

          } */}

        <FormControl display="flex" alignItems="center" p="3" h="5vh">
          <FormLabel htmlFor="dark-mode" mb="0" id="darkmodelabel">
            Dark Mode?
          </FormLabel>
          <Switch
            id="dark-mode"
            isChecked={colorMode === "light" ? false : true}
            onChange={() => toggleColorMode()}
          />
        </FormControl>
      </Flex>
    );
  }
};

export default Navbar;
