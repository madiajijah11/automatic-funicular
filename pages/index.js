import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import Head from "next/head";
import Users from "./components/Users/Users";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Navbar />
			<Users />
			<Hero />
			<Statistics />
			<Testimonials />
			<Pricing />
			<Footer />
		</>
	);
}
