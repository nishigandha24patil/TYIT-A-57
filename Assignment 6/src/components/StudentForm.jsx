import { useState } from 'react';

function StudentForm({ onStudentSubmit }) {

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    marks: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {

    const newErrors = {};

    // Name validation
    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters';
    }

    // Roll Number validation
    if (formData.rollNumber.trim() === '') {
      newErrors.rollNumber = 'Roll number is required';
    } else if (!/^[0-9]+$/.test(formData.rollNumber)) {
      newErrors.rollNumber = 'Roll number should contain only numbers';
    }

    // Department validation
    if (formData.department.trim() === '') {
      newErrors.department = 'Department is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.department)) {
      newErrors.department = 'Department should contain only letters';
    }

    // Marks validation
    if (formData.marks.trim() === '') {
      newErrors.marks = 'Marks are required';
    } else if (!/^[0-9]+$/.test(formData.marks)) {
      newErrors.marks = 'Marks should contain only numbers';
    } else if (Number(formData.marks) < 0 || Number(formData.marks) > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (validateForm()) {

      onStudentSubmit(formData);

      // Clear form after successful submission
      setFormData({
        name: '',
        rollNumber: '',
        department: '',
        marks: ''
      });

      setErrors({});
    }
  };

  return (
    <div className="student-form">

      <h2>Student Form</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />

          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>


        {/* Roll Number */}
        <div className="form-group">
          <label>Roll Number</label>

          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Enter roll number"
          />

          {errors.rollNumber && (
            <p className="error">{errors.rollNumber}</p>
          )}
        </div>


        {/* Department */}
        <div className="form-group">
          <label>Department</label>

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
          />

          {errors.department && (
            <p className="error">{errors.department}</p>
          )}
        </div>


        {/* Marks */}
        <div className="form-group">
          <label>Marks</label>

          <input
            type="text"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter marks (0-100)"
          />

          {errors.marks && (
            <p className="error">{errors.marks}</p>
          )}
        </div>


        <button type="submit">
          Add Student
        </button>

      </form>

    </div>
  );
}

export default StudentForm;