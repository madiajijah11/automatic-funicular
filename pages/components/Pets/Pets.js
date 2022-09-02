import mongoDbConnect from "../../lib/mongodb";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Pets = ({ pets }) => {
	return (
		<TableContainer>
			<Table size="sm">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Age</Th>
						<Th>Type</Th>
						<Th>Breed</Th>
						<Th>Description</Th>
					</Tr>
				</Thead>
				<Tbody>
					{pets?.map((pet) => (
						<Tr>
							<Td>{pet.name}</Td>
							<Td>{pet.age}</Td>
							<Td>{pet.type}</Td>
							<Td>{pet.breed}</Td>
							<Td>{pet.description}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export async function getStaticProps() {
	await mongoDbConnect();

	const res = await fetch("http://localhost:3000/api/pets");
	const data = await res.json();

	return {
		props: {
			pets: data,
		},
	};
}

export default Pets;
