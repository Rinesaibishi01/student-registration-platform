import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista e Studenteve</h2>
      {students.map(s => (
        <p key={s.id}>
          {s.numri_studentit} - Viti {s.viti_studimit}
        </p>
      ))}
    </div>
  );
}

export default Students;