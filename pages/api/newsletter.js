import { connectDatabase, insertDocument } from "@/helpers/db-util";

async function handler(req, res) {
  // 개선포인트 체크 - database, collection 지정
  const db = "newletter";
  const col = "emails";
  // 개선포인트 체크 - database, collection 지정

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await insertDocument(client, db, col, { email: userEmail });
      client.close();
      console.log("mongodb client close");
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
