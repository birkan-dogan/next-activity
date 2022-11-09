// // import fs from "fs";
// // import path from "path";

// const handler = (req, res) => {
//   if (req.method === "POST") {
//     const email = req.body.email;

//     // also here, we can validate entered email, we can rely on back-end validation

//     // if(!email || !email.includes("@")){
//     //     res.status(422).json({message:"Invalid email address"})
//     //     return
//     // }

//     // we will create object to store data

//     const newUser = {
//       id: new Date().toISOString(),
//       email: email,
//     };

//     // we'll store that in a database

//     const filePath = path.join(process.cwd(), "data", "new-user.json");
//     const fileData = fs.readFileSync(filePath);
//     const data = JSON.parse(fileData);
//     data.push(newUser);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     res.status(201).json({ message: "Success", user: newUser });
//   } else {
//     res.status(200).json({ message: "This works" });
//   }
// };

// export default handler;

// Setting up a MongoDB Database

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    const client = await MongoClient.connect(
      "mongodb+srv://Birkan:birkan@cluster0.0fb34j8.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: email });

    client.close();
    res.status(201).json({ message: "Success", user: newUser });
  } else {
    res.status(200).json({ message: "This works" });
  }
};

export default handler;
