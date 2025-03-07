import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<section className="max-width-container">
			<div className="not-found">
				<h1>Sorry! We could not found this page for you.</h1>
				<Link className="text-link" to={"/"}>
					Go back to the front page and find your next Barcelona Tip!
				</Link>
			</div>
		</section>
	);
}

export default NotFoundPage;
