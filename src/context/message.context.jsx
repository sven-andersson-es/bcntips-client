import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

const MessageContext = React.createContext();

function MessageProviderWrapper(props) {
	const [modalActive, setModalActive] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [modalMessageType, setModalMessageType] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [modalConfirmButtons, setModalConfirmButtons] = useState(false);
	const triggerModal = (activate, message, autoclose, confirm) => {
		setModalActive(activate);
		setModalMessage(message);
		if (autoclose) {
			setTimeout(() => {
				setModalActive(false);
			}, 5000);
		}
		
		if (confirm) {
			setModalConfirmButtons(true);
		} else {
			setModalConfirmButtons(false)
		}
	};

	
	return (
		<MessageContext.Provider
			value={{
				triggerModal,
				deleteConfirm,
				setDeleteConfirm,
				setModalActive
			}}
		>
			<Modal
				props={{
					modalActive,
					setModalActive,
					modalMessage,
					modalMessageType,
					setDeleteConfirm,
					modalConfirmButtons,
				}}
			/>
			{props.children}
		</MessageContext.Provider>
	);
}

export { MessageProviderWrapper, MessageContext };
