//import style
import "../styles/home.css";

//import assets
import home from "../assets/home.svg";
import user from "../assets/user.svg";
import students from "../assets/students.svg";
import teachers from "../assets/teachers.svg";
import absences from "../assets/absences.svg";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Absences() {
  const navigate = useNavigate();

  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [absencesList, setAbsencesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      Axios.get("http://localhost:3001/students")
        .then((res) => {
          console.log(res.data);
          setStudentsList(res.data);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });

      Axios.get("http://localhost:3001/teachers")
        .then((res) => {
          console.log(res.data);
          setTeachersList(res.data);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });

      setTimeout(() => {
        Axios.get("http://localhost:3001/absences")
          .then((res) => {
            console.log(res.data);
            setAbsencesList(res.data);
          })
          .catch((err) => {
            setError(err);
            console.log(err);
          });
      }, 1000);
    }
  }, []);

  return (
    <div className="home-page">
      <Header />

      <div className="home">
        <SideMenu type={accountType} page="absences" />

        <div className="main-page">
          <div className="settings">
            <h1>Students List</h1>
            <form className="filters">
              <select
                name="filter-by-speciality"
                id="filter-by-speciality"
                defaultValue=""
              >
                <option disabled value="">
                  Filter by speciality
                </option>
                <option value="TI">TI</option>
                <option value="GL">GL</option>
                <option value="SCI">SCI</option>
                <option value="SI">SI</option>
              </select>
              <select
                name="filter-by-group"
                id="filter-by-group"
                defaultValue=""
              >
                <option disabled value="">
                  Filter by group
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div>
                <input
                  type="checkbox"
                  name="order-alphabetically"
                  id="order-alphabetically"
                />
                <label htmlFor="order-alphabetically">
                  Order alphabetically
                </label>
              </div>
            </form>
          </div>
          {(studentsList.length === 0 ||
            teachersList.length === 0 ||
            absencesList.length === 0) && <Loading />}
          {studentsList.length > 0 &&
            teachersList.length > 0 &&
            absencesList.length > 0 && (
              <div className="cards">
                {absencesList.map((absence) => (
                  <div className="card" key={absence._id}>
                    <div className="labels">
                      <p>Last Name :</p>
                      <p>First Name :</p>
                      <p>Speciality :</p>
                      <p>Group :</p>
                      <p>Class :</p>
                      <p>Teacher :</p>
                      <p>Date :</p>
                      <p>Nature :</p>
                    </div>
                    <div className="values">
                      <p>
                        {
                          studentsList.find(
                            (student) => student._id === absence.student_id
                          ).last_name
                        }
                      </p>
                      <p>
                        {
                          studentsList.find(
                            (student) => student._id === absence.student_id
                          ).first_name
                        }
                      </p>
                      <p>
                        {
                          studentsList.find(
                            (student) => student._id === absence.student_id
                          ).speciality
                        }
                      </p>
                      <p>
                        0
                        {
                          studentsList.find(
                            (student) => student._id === absence.student_id
                          ).group
                        }
                      </p>
                      <p>
                        {
                          teachersList.find(
                            (teacher) => teacher._id === absence.teacher_id
                          ).class_name
                        }{" "}
                        - {absence.class_type}
                      </p>
                      <p>
                        {
                          teachersList.find(
                            (teacher) => teacher._id === absence.teacher_id
                          ).last_name
                        }{" "}
                        {
                          teachersList.find(
                            (teacher) => teacher._id === absence.teacher_id
                          ).first_name
                        }
                      </p>
                      <p>
                        {new Date(absence.date).getDate()}/
                        {new Date(absence.date).getMonth()}/
                        {new Date(absence.date).getFullYear()} -{" "}
                        {new Date(absence.date).getHours()}:
                        {new Date(absence.date).getMinutes()}
                      </p>
                      <p id="nature">
                        {absence.justified ? "Justified" : "Unjustified"}
                      </p>
                    </div>
                    <div className="ed-btns">
                      <div id="edit-btn" onClick={() => {}}></div>
                      <div id="delete-btn" onClick={() => {}}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Absences;
