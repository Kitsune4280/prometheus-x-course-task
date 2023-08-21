import Header from '../components/header/Header';
import Signin from '../components/signin/Signin';
import Footer from '../components/footer/Footer';
export default function LoginPage() {
	return (
		<>
			<Header navHidden={true} />
			<Signin />
			<Footer />
		</>
	);
}
