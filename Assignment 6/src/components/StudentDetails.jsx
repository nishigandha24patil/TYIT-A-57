function StudentDetails({ students, onClear }) {

  return (
    <div className="student-details">

      <h2>Student Details</h2>

      {students.length === 0 ? (

        <p className="no-students">
          No student records added yet.
        </p>

      ) : (

        <>
          <table>

            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Department</th>
                <th>Marks</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.department}</td>
                  <td>{student.marks}</td>

                </tr>

              ))}

            </tbody>

          </table>

          <button
            className="clear-button"
            onClick={onClear}
          >
            Clear All Records
          </button>

        </>

      )}

    </div>
  );
}

export default StudentDetails;