import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Register() {
  const [student, setStudent] = useState({ 
    numri_studentit: "", 
    programi: "", 
    viti_studimit: "" 
  });
  const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Të dhënat që po dërgohen:", student); // Ky rresht të ndihmon të shohësh nëse React po punon mirë
    try {
      // Dërgimi i të dhënave në Backend
      await axios.post("http://localhost:5000/students", student);
      
      // Nëse gjithçka shkon mirë, shfaqet njoftimi i gjelbër
      Swal.fire({
        title: 'Sukses!',
        text: 'Studenti u regjistrua me sukses në sistem.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      navigate("/"); 
    } catch (err) { 
      // Nëse backend-i kthen 500, gabimi fiks do të shfaqet në konsollën e browser-it
      console.error("Detajet e gabimit nga Serveri:", err.response?.data); 
      
      Swal.fire({
        title: 'Gabim!',
        text: 'Nuk u mundësua regjistrimi. Kontrolloni terminalin e Backend-it.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Provo përsëri'
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Regjistrimi i Studentit</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Numri i Studentit</label>
                  <input 
                    type="text"
                    placeholder="Psh. 2425736" 
                    className="form-control" 
                    onChange={(e) => setStudent({...student, numri_studentit: e.target.value})} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Programi Studimor</label>
                  <input 
                    type="text"
                    placeholder="Psh. SHKI" 
                    className="form-control" 
                    onChange={(e) => setStudent({...student, programi: e.target.value})} 
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Viti i Studimit</label>
                  <input 
                    type="number" 
                    placeholder="Psh. 2025" 
                    className="form-control" 
                    onChange={(e) => setStudent({...student, viti_studimit: e.target.value})} 
                    required 
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    onClick={() => navigate("/")} 
                    className="btn btn-outline-secondary px-4"
                  >
                    Anulo
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-5 fw-bold"
                  >
                    Ruaj Studentin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;