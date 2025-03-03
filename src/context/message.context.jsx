import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

const MessageContext = React.createContext();

function MessageProviderWrapper(props) {
	const [modalActive, setModalActive] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [modalMessageType, setModalMessageType] = useState("");
  const triggerModal = (activate, message, autoclose) => {
    setModalActive(activate)
    setModalMessage(message)
    if (autoclose) {
      setTimeout(() => {
        setModalActive(false)
      }, 5000);
    }
  }
	return (
		<MessageContext.Provider
			value={{
				triggerModal
			}}
		>
			<Modal
				props={
					{modalActive,
					setModalActive,
					modalMessage,
					modalMessageType}
				}
			/>
			{props.children}
		</MessageContext.Provider>
	);
}

export { MessageProviderWrapper, MessageContext };
