import mongoDbConnect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../models/user";

export default async function handler(req, res) {
	await mongoDbConnect();
	if (req.method === "GET") {
		try {
			const getAllUsers = await User.find({});
			if (!getAllUsers) {
				return res.status(404).json({
					message: "No users found",
				});
			}
			return res.status(200).json({ message: "Complete users found", data: getAllUsers });
		} catch (error) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
	if (req.method === "POST") {
		const { name, email, password, confirmPassword } = req.body;
		if (!name || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: "Missing fields" });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		try {
			const newUser = await User.findOne({ email: email });
			if (newUser) {
				return res.status(400).json({ message: "User already exists" });
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newUser1 = new User({
				name: name,
				email: email,
				password: hashedPassword,
			});
			await newUser1.save();
			return res.status(201).json({ message: "User created", data: newUser });
		} catch (error) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
	return res.status(405).json({ message: "Method not allowed" });
}
