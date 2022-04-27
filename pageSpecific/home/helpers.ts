export const saveSettings = async (body: object) => {
  try {
    await fetch("api/saveSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log("Unknown error");
  }
};
