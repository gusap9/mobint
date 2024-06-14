import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import Main from './components/Main/Main';
import Modal from './components/Popup/modal/Modal';
import { Preview } from './components/Preview/Preview';
import { useAllItemsMutation } from './store/api/itemApi';
import { addItems, setItems } from './store/slices/itemSlice';
import { useAppDispatch } from './store/use-app';

export function App() {
	const [previewOpen, setPreviewOpen] = useState<boolean>(true);
	const [modalMessage, setModalMessage] = useState<string>('');
	const [currentOffset, setCurrentOffset] = useState<number>(0);
	const dispatch = useAppDispatch();
	const [getAllItems, { isLoading, isError }] = useAllItemsMutation();
	useEffect(() => {
		const preview = setTimeout(() => {
			setPreviewOpen(false);
		}, 3000);
		return () => {
			clearTimeout(preview);
		};
	}, []);

	const scrollHandler = (): void => {
		if (
			document.documentElement.scrollHeight -
				(document.documentElement.scrollTop + window.innerHeight) <
			5
		) {
			getAllItems({ offset: currentOffset, limit: 5 })
				.unwrap()
				.then((data) => {
					dispatch(addItems(data?.companies));
					setCurrentOffset((prev) => prev + 10);
				})
				.catch((err) => {
					if (err.status === 401) setModalMessage('ошибка авторизации');
					if (err.status === 500) setModalMessage('всё упало');
					if (err.status === 400) setModalMessage(err.data.message);
				});
		}
	};

	useEffect(() => {
		if (!isError) document.addEventListener('scroll', scrollHandler);
		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	useEffect(() => {
		getAllItems({ offset: currentOffset, limit: 5 })
			.unwrap()
			.then((data) => {
				dispatch(setItems(data?.companies));
				setCurrentOffset((prev) => prev + 10);
			})
			.catch((err) => {
				if (err.status === 401) setModalMessage('ошибка авторизации');
				if (err.status === 500) setModalMessage('всё упало');
				if (err.status === 400) setModalMessage(err.data.message);
			});
	}, []);
	const handleModalClose = () => {
		setModalMessage('');
	};
	if (previewOpen) {
		return (
			<>
				<Preview previewOpen={previewOpen} />
			</>
		);
	}

	return (
		<>
			<Header />
			<Main isLoading={isLoading} />
			{modalMessage && (
				<Modal title={modalMessage} onClose={handleModalClose} />
			)}
		</>
	);
}

export default App;
