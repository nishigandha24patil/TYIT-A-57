import { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';

function App() {

  const [students, setStudents] = useState([]);

  const handleStudentSubmit = (studentData) => {
    setStudents([...students, studentData]);
  };

  const handleClearStudents = () => {
    setStudents([]);
  };

  return (
    <div className="app">

      <h1>Student Information Application</h1>

      <StudentForm onStudentSubmit={handleStudentSubmit} />

      <StudentDetails
        students={students}
        onClear={handleClearStudents}
      />

    </div>
  );
}

export default App;