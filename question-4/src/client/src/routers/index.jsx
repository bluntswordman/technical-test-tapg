import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import UserPage from "../pages/users/index.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<UserPage/>}></Route>
    )
);

export default router