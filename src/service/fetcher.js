export const sendData = (data) => {
  const url = "http://85.119.146.179:8000/web-data";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
