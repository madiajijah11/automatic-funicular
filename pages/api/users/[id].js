import mongoDbConnect from "../../lib/mongodb";
import User from "../../models/user";

export default async function handler(req, res) {
	const {
		query: { id },
	} = req;
	await mongoDbConnect();
	if (req.method === "GET") {
		try {
			const getUserById = await User.findById({ _id: id });
			if (!getUserById) {
				return res.status(404).json({
					message: "No users found",
				});
			}
			return res.status(200).json({ message: "User found", data: getUserById });
		} catch (error) {
			return res.status(500).json({
				message: "Something went wrong",
			});
		}
	}
	if (req.method === "DELETE") {
		try {
			const deleteUser = await User.deleteOne({ _id: id });
			if (!deleteUser) {
				return res.status(404).json({
					message: "No users found",
				});
			}
			return res.status(200).json({ message: "User deleted", data: deleteUser });
		} catch (error) {
			return res.status(500).json({
				message: "Something went wrong",
			});
		}
	}
	return res.status(405).json({ message: "Method not allowed" });
}
