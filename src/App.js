import {Router} from "./framework/router/Router";
import {useAuth} from "./pages/UseAuth";


export const App = () => {
    useAuth();
    return (
        <div>
            <Router />
        </div>
    )
}