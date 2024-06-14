import type { MouseEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Portal from '../portal/Portal';
import './Modal.css';

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = {
	title: string;
	onClose?: () => void;
};

type containerOptions = {
  id: string;
  mountNode?: HTMLElement;
};
const createContainer = (options: containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }
  const { id, mountNode = document.body } = options;
  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("id", id);
  mountNode.appendChild(portalContainer);
};

const Modal = ({ title, onClose }: Props) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID });
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current === target) {
				onClose?.();
			}
		};
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('click', handleWrapperClick);
		window.addEventListener('keydown', handleEscapePress);

		return () => {
			window.removeEventListener('click', handleWrapperClick);
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> =
		useCallback(() => {
			onClose?.();
		}, [onClose]);

	return (
		isMounted && (
			<Portal id={MODAL_CONTAINER_ID}>
				<div className="wrap" ref={rootRef}>
					<div className="content">
						<button
							type="button"
							className="popup__close"
							onClick={handleClose}
						>
							x
						</button>
						<p>{title}</p>
						<button className="popup__button" onClick={handleClose}>
							Хорошо
						</button>
					</div>
				</div>
			</Portal>
		)
	);
};

export default Modal;
