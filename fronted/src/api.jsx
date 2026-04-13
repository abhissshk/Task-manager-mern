import { API_URL } from "./utlis";

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/task`;
  console.log("url:", url);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const GetAllTask = async () => {
  const url = `${API_URL}/task`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const DeleteTaskById = async (id) => {
  const url = `${API_URL}/task/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const UpdateTaskById = async (id, reqByid) => {
  const url = `${API_URL}/task/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqByid),
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
