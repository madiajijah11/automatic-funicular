import mongoDbConnect from "../../lib/mongodb";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Pet from "../../models/petModel";

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
					{pets &&
						pets.map((pet) => (
							<Tr key={pet._id}>
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

export async function getServerSideProps() {
	await mongoDbConnect();

	const result = await Pet.find({});
	const pets = result.json();

	return {
		props: {
			pets: pets,
		},
	};
}

export default Pets;
