import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://Birkan:birkan@cluster0.0fb34j8.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // validation input

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      // MongoDB will create a unique id for us
      email,
      name,
      text,
      eventId, // to consider which comments belongs to what
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId; // the newComment which we sent to the frontend also contains unique id that was generated

    res.status(201).json({ message: "Added comment", comment: newComment });
  }
  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ message: "Added comment", comments: documents });
  }
  client.close();
};

export default handler;
