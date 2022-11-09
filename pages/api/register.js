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

import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email: email });
      res.status(201).json({ message: "Success" });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  } else {
    res.status(200).json({ message: "This works" });
  }
};

export default handler;
