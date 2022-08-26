import mongoDbConnect from "../../lib/mongodb";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import userModel from "../../models/userModel";

const Users = ({ users }) => {
	return (
		<TableContainer>
			<Table size="sm">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Email</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users &&
						users.map((user) => (
							<Tr key={user._id}>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export async function getStaticProps() {
	await mongoDbConnect();

	const result = await userModel.find({});
	const users = result.map((data) => {
		const user = data.toObject();
		user._id = user._id.toString();
		return user;
	});

	return {
		props: {
			users: users,
		},
	};
}

export default Users;
