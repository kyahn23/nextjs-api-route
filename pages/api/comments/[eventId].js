function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // 유효성검사
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    // comment 리스트 불러오기
    const dummy = [
      { id: "c1", name: "aaaa", text: "asdfasdf" },
      { id: "c2", name: "bbbb", text: "zxcvzxcv" },
      { id: "c3", name: "cccc", text: "qwerqwer" },
    ];
    res.status(200).json({ comments: dummy });
    return;
  }
}

export default handler;
