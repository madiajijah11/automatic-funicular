import mongoDbConnect from "../../lib/mongodb";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import User from "../../models/userModel";

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

export async function getServerSideProps() {
	await mongoDbConnect();

	const result = await User.find({});
	const users = result.json();

	return {
		props: {
			users: users,
		},
	};
}

export default Users;
