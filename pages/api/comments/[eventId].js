import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const url =
    "mongodb+srv://kyahn:3j3IwKSAIYw6nj50@cluster0.7jehjja.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  const db = client.db("events");

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
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    try {
      const comments = db.collection("comments");

      const result = await comments.insertOne({ comment: newComment });
      console.log(result);

      newComment.id = result.insertedId;
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    // comment 리스트 불러오기
    const dummy = [
      { id: "c1", name: "aaaa", text: "asdfasdf" },
      { id: "c2", name: "bbbb", text: "zxcvzxcv" },
      { id: "c3", name: "cccc", text: "qwerqwer" },
    ];

    const comments = await db
      .collection("comments")
      .find({ "comment.eventId": eventId })
      .sort({ _id: -1 })
      .toArray();
    console.log(comments);

    res.status(200).json({ comments: comments });
    return;
  }

  console.log("mongodb client close");
  client.close();
}

export default handler;
