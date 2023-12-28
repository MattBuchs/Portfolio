import { useDispatch, useSelector } from "react-redux";
import { selectPageComponent } from "./features/tabs";
import Header from "./components/Header/Header";

function App() {
    const dispatch = useDispatch();
    const { tabs, selectedTab } = useSelector((state) => state.tabs);

    const PageComponent = selectPageComponent(tabs, selectedTab + 1);

    return (
        <div id="degraded">
            <Header />
            <main className="pt-20">
                <PageComponent />
            </main>
        </div>
    );
}

export default App;
