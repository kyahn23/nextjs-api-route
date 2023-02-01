import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const url =
      "mongodb+srv://kyahn:3j3IwKSAIYw6nj50@cluster0.7jehjja.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);

    try {
      const db = client.db("newsletter");
      const emails = db.collection("emails");

      await emails.insertOne({ email: userEmail });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("mongodb client close");
      await client.close();
    }
    // MongoClient.connect(
    //   "mongodb+srv://kyahn:3j3IwKSAIYw6nj50@cluster0.7jehjja.mongodb.net/newsletter?retryWrites=true&w=majority"
    // ).then((client) => {
    //   const db = client.db();
    //   db.collection("emails").insertOne(userEmail);
    // });

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
