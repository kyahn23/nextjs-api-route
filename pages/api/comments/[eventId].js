import { connectDatabase, getData, insertDocument } from "@/helpers/db-util";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await connectDatabase();
  // 개선포인트 체크 - database, collection 지정
  const db = "events";
  const col = "comments";
  // 개선포인트 체크 - database, collection 지정

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
      client.close();
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    let result;
    try {
      result = await insertDocument(client, db, col, {
        comment: newComment,
      });
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  }

  if (req.method === "GET") {
    // comment 리스트 불러오기
    try {
      const comments = await getData(client, db, col, {
        "comment.eventId": eventId,
      });
      console.log(comments);

      res.status(200).json({ comments: comments });

      return;
    } catch (error) {
      res.status(500).json({ message: "Fetching data failed" });
    }
  }

  client.close();
  console.log("mongodb client close");
}

export default handler;
