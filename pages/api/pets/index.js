import mongoDbConnect from "../../lib/mongodb";

import Pet from "../../models/petModel";

export default async function handler(req, res) {
    await mongoDbConnect();
    if (req.method === "GET") {
        try {
            const getAllPets = await Pet.find({});
            if (!getAllPets) {
                return res.status(404).json({
                    message: "No pets found",
                });
            }
            return res.status(200).json(getAllPets);
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
    if (req.method === "POST") {
        const { name, age, type, breed, description } = req.body;
        if (!name || !age || !type || !breed || !description) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            const newPet = new Pet({
                name: name,
                age: age,
                type: type,
                breed: breed,
                description: description,
            });
            await newPet.save();
            return res.status(201).json({ message: "Pet created" });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
    return res.status(405).json({ message: "Method not allowed" });
}