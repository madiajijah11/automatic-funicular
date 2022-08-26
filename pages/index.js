import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import Head from "next/head";
import Pets from "./components/Pets/Pets";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Navbar />
			<Pets />
			<Hero />
			<Statistics />
			<Testimonials />
			<Pricing />
			<Footer />
		</>
	);
}
