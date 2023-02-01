import { MongoClient } from "mongodb";

async function handler(req, res) {
  const url =
    "mongodb+srv://kyahn:3j3IwKSAIYw6nj50@cluster0.7jehjja.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  const db = client.db("newsletter");
  const emails = db.collection("emails");

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    try {
      await emails.insertOne({ email: userEmail });
    } catch (error) {
      console.log(error);
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

  console.log("mongodb client close");
  client.close();
}

export default handler;
