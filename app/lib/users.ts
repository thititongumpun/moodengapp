export const getUsers = async () => {
  try {
    const res = await fetch('https://kong.wcydtt.co/moodeng/random', {
      headers: {
        "apiKey": "yesokmybro"
      }
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}