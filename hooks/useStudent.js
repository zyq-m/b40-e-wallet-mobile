import instanceAxios from "../lib/instanceAxios";
import { useState, useEffect } from "react";
import axios from "axios";

export const useStudent = ({ id, student, refresh }) => {
  const [students, setStudents] = useState([]);

  const getStudentById = signal => {
    instanceAxios
      .get(`/api/students/${id}`, {
        signal: signal,
      })
      .then(res => setStudents(res.data))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("Request cancel");
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    student && getStudentById(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (student && refresh) {
      getStudentById(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [refresh]);

  return { students };
};
