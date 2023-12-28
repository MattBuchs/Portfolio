import { useSelector } from "react-redux";
import { selectPageComponent } from "./features/tabs";
import Header from "./components/Header/Header";

function App() {
    const { tabs, selectedTab } = useSelector((state) => state.tabs);
    const { isDarkmode } = useSelector((state) => state.darkMode);

    const PageComponent = selectPageComponent(tabs, selectedTab + 1);

    return (
        <div id={`${isDarkmode ? "dark-degraded" : "light-degraded"}`}>
            <Header />
            <main className="pt-20">
                <PageComponent />
            </main>
        </div>
    );
}

export default App;
