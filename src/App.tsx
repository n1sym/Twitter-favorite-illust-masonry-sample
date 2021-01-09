import MainTable from "./Components/MainTable";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>iine-app-handson</title>
      </Helmet>
      <div className="bg-blue-50 min-h-screen">
        <div className="container mx-auto">
          <header className="flex justify-center items-center text-3xl h-24">
            いいねした画像を並べるサイト
          </header>
          <div className="flex justify-center">
            <MainTable />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
