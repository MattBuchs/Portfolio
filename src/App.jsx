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
            <main className="px-4 sm:px-20 xl:px-52">
                <PageComponent />
            </main>
        </div>
    );
}

export default App;
