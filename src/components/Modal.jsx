function Modal(props) {
	const {
		modalActive,
		setModalActive,
		modalMessage,
		modalMessageType,
		setDeleteConfirm,
		modalConfirmButtons,
	} = props.props;

	if (modalActive) {
		return (
			<>
				<div className="modal__content">
					<div className="modal__content--close">
						<button
							className="modal__content--close--button"
							onClick={() => {
								setModalActive(!modalActive);
							}}
						>
							<svg
								width="21"
								height="22"
								viewBox="0 0 21 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.1363 4.66529L3.21384 21.5877L0.720688 17.786L17.6431 0.86359L20.1363 4.66529Z"
									fill="currentColor"
								/>
								<path
									d="M16.9889 20.9334L0.0664383 4.01095L3.86815 1.51781L20.7906 18.4402L16.9889 20.9334Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
					<div className="modal__content--message">{modalMessage}</div>
					{modalConfirmButtons && (
							<div className="modal__confirm-buttons">
								<button
									onClick={() => {
										setModalActive(!modalActive);
									}}
									className="modal__confirm-button-cancel btn--inline"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										setDeleteConfirm(true);
									}}
									className="modal__confirm-button-delete btn--inline"
								>
									Delete
								</button>
							</div>
					)}
				</div>
				<div
					className="modal"
					onClick={() => {
						setModalActive(!modalActive);
					}}
				></div>
			</>
		);
	} else {
		return <></>;
	}
}

export default Modal;
