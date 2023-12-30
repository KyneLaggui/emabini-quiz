import { useSelector } from "react-redux"
import { selectRole } from "../../redux/slice/authSlice"

const StudentOnlyLink = ({ children }) => {
    const role = useSelector(selectRole)
    if (role === "student") {
        return children
    }

    return null;
}

const FacultyOnlyLink = ({ children }) => {
    const role = useSelector(selectRole)
    if (role === "faculty" || role === "faculty admin") {
        return children
    }

    return null;
}

const FacultyHeadOnlyLink = ({ children }) => {
    const role = useSelector(selectRole)
    if (role === "faculty admin") {
        return children
    }

    return null;
}

export {
    StudentOnlyLink,
    FacultyOnlyLink,
    FacultyHeadOnlyLink
}