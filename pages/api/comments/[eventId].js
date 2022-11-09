import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

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

      client.close();

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

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId; // the newComment which we sent to the frontend also contains unique id that was generated
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ message: "Added comment", comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
};

export default handler;
