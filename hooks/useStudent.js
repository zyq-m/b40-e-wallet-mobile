import instanceAxios from "../lib/instanceAxios";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTriggerRefresh } from "./useTriggerRefresh";

export const useStudent = ({ id, student, refresh }) => {
  const [students, setStudents] = useState();
  const { trigger } = useTriggerRefresh(refresh);

  const getStudentById = signal => {
    instanceAxios
      .get(`/api/students/${id}`, {
        signal: signal,
      })
      .then(res => setStudents(res.data[0]))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("Request cancel");
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    if (student) {
      getStudentById(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [trigger]);

  return { students };
};
