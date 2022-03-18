import Home from "./components/Home";

function App() {
  return (
    <div>
      <h1>Study Buddy</h1>
      <h3> Courses:</h3>
      <Home text='CIS4301'/>
      <Home text='GEA3600'/>
      <Home text='THE2000'/>
      <Home text='CHM2045'/>
    </div>
  );
}

export default App;
