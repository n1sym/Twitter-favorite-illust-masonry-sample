import MainTable from "./Components/MainTable";

function App() {
  return (
    <div className="container mx-auto">
      <header className="flex justify-center items-center text-3xl h-24">
        いいねした画像を並べるサイト
      </header>
      <div className="flex justify-center">
        <MainTable/>
      </div>
    </div>
  );
}

export default App;
