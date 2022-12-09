import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import HomePage from "../components/home/HomePage";
import DashboardPage from "../components/dashboard/DashboardPage";
import PostPage from "../components/dashboard/posts/PostPage";
import AddPost from "../components/dashboard/posts/postActions/AddPost";
import EditPost from "../components/dashboard/posts/postActions/EditPost";
import ProfilesPage from "../components/profiles/ProfilesPage";
import SpecificProfilePage from "../components/profiles/SpecificProfilePage"
import SpecificPostPage from "../components/dashboard/posts/SpecificPostPage";
import NavLayout from "../components/layout/Nav";
import UpdateBanner from "../components/profiles/update/UpdateBanner";
import UpdateAvatar from "../components/profiles/update/UpdateAvatar";


export default function MyRoutes () {

    return (
        <Router>
            <NavLayout/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="dashboard" element={<DashboardPage/>} />
                <Route path="dashboard/posts" element={<PostPage />} />
                <Route path="dashboard/posts/:id" element={<SpecificPostPage />} />
                <Route path="dashboard/posts/add" element={<AddPost />} />
                <Route path="dashboard/posts/edit/:id" element={<EditPost />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="users" element={<ProfilesPage />} />
                <Route path="users/:name" element={<SpecificProfilePage />} />
                <Route path="updatebanner/:name" element={<UpdateBanner />} />
                <Route path="updateavatar/:name" element={<UpdateAvatar />} />
            </Routes>
        </Router>
    );
}

//                 <Route path="user/name" element={<MyProfilePage />} />
//                 <Route path="users" element={<ProfilesListPage />} />