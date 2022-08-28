/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Flex } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as LibRoutes,
} from "react-router-dom";
import Generate from "./components/Features/Roadmap/Generate";
import Preview from "./components/Features/Roadmap/Preview";
import Templates from "./components/Features/Roadmap/Templates";
import FeedItem from "./components/FeedItem";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import SingleNote from "./pages/SingleNote";
import Blog from "./components/Features/Blog/Blog";
import BlogDetail from "./components/Features/Blog/BlogDetail";
import Search from "./components/Features/Search/Search";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import CreateBlog from "./pages/CreateBlog";
import { RoadmapProvider } from "./components/Features/Roadmap/context/RoadmapContext";
import Details from "./components/Features/Roadmap/Details";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordGetLink from "./pages/ResetPasswordGetLink";
import Notification from "./pages/Notification.jsx";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoadmapProvider>
        <LibRoutes>
          <Route
            path="/"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Home />
              </Flex>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/reset" element={<ResetPasswordGetLink />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/profile/:uid"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Profile />
              </Flex>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <FeedItem />
              </Flex>
            }
          />

          <Route
            path="/payment/success"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <PaymentSuccess />
              </Flex>
            }
          />

          <Route
            path="/payment/cancel"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <PaymentFailure />
              </Flex>
            }
          />

          <Route
            path="/notification"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Notification />
              </Flex>
            }
          />
          <Route
            path="/favorite"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Favorite />
              </Flex>
            }
          />

          <Route
            path="/notes"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Notes />
              </Flex>
            }
          />

          <Route
            path="/event"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Event addbutton={true} />
              </Flex>
            }
          />
          <Route
            path="/event/new"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <CreateEvent />
              </Flex>
            }
          />
          <Route
            path="/blog/new"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <CreateBlog />
              </Flex>
            }
          />
          <Route
            path="blog"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Blog addButton={true} />
              </Flex>
            }
          />
          <Route
            path="blog/:blogId"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <BlogDetail />
              </Flex>
            }
          />
          <Route
            path="/note/:id"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <SingleNote />
              </Flex>
            }
          />

          <Route
            path="/search"
            element={
              <Flex
                w="100vw"
                minH="100vh"
                position="relative"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Navbar />
                <Search />
              </Flex>
            }
          />
          <Route path="/roadmap">
            <Route
              path="templates"
              element={
                <Flex
                  w="100vw"
                  minH="100vh"
                  position="relative"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  <Navbar />
                  <Templates />
                </Flex>
              }
            />

            <Route
              path="generate"
              element={
                <Flex
                  w="100vw"
                  minH="100vh"
                  position="relative"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  <Navbar />
                  <Generate />
                </Flex>
              }
            />

            <Route
              path="details"
              element={
                <Flex
                  w="100vw"
                  minH="100vh"
                  position="relative"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  <Navbar />
                  <Details />
                </Flex>
              }
            />

            <Route
              path="preview"
              element={
                <Flex
                  w="100vw"
                  minH="100vh"
                  position="relative"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  <Navbar />
                  <Preview />
                </Flex>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </LibRoutes>
      </RoadmapProvider>
    </BrowserRouter>
  );
};

export default Routes;
