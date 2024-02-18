import { useState } from "react";
import data from "./constants/data";
import { RotatingLines } from "react-loader-spinner";
import logo from "/logo.png";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedRollNo, setSelectedRollNo] = useState('');
  const [selectedNamesSet, setSelectedNamesSet] = useState(new Set());

  const getRandomName = () => {
    const remainingNames = data.filter(item => !selectedNamesSet.has(item.name));

    // If all names have been selected, reset the selectedNamesSet
    if (remainingNames.length === 0) {
      setSelectedNamesSet(new Set());
    }

    const randomIndex = Math.floor(Math.random() * remainingNames.length);
    const newName = remainingNames[randomIndex].name;
    const newRollNo = remainingNames[randomIndex].rollNo;

    setSelectedName(newName);
    setSelectedRollNo(newRollNo);
    setSelectedNamesSet(new Set(selectedNamesSet).add(newName));
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      getRandomName();
    }, 3000);
  };

  return (
    <div className="app">
      <h1>Who is Lucky?</h1>
      <img src={logo} alt="LOGO" className="logo" />

      {!isLoading && selectedName && (
       <>
        <div className="person-name">RollNo: {selectedRollNo}</div>
        <div className="person-name">Name: {selectedName}</div>
        </>
      )}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="btn-find">
        Find
      </button>

      {isLoading && (
        <div className="overlay">
          <div className="loader-container">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="#ffffff"
              strokeWidth="4"
              animationDuration="3"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass="loader"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
