const LoadingButton = () => (
	<button className="btn btn-primary" type="button" disabled>
		Loading...
		<span
			className="spinner-grow spinner-grow-sm"
			role="status"
			aria-hidden="true"
		></span>
	</button>
);

export default LoadingButton;