import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();

    const onLogOutclick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <>
            <button onClick={onLogOutclick}>Log Out</button>
        </>
    );
};

export default Profile;