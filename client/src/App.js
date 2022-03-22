import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <div>
      <h1>Study Buddy</h1>
      <h2>Login</h2>
    </div>
  );
}
export default App;
