import { useState } from 'react';
import { ICompany } from '../../model/model';
import Modal from '../Popup/modal/Modal';
import './Card.css';

interface Props {
	card: ICompany;
}

export const Card = ({ card }: Props) => {
	const [modalMessage, setModalMessage] = useState<string>('');
	const handleClick = (message: string) => {
		setModalMessage(`нажата кнопка ${message}`);
	};
	const handleModalClose = () => {
		setModalMessage('');
	};
	const getNoun = (num: number): string => {
		switch (String(num).slice(-1)) {
			case '0':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				return 'баллов';
				break;
			case '1':
				return 'балл';
				break;
			case '2':
			case '3':
			case '4':
				return 'балла';
				break;
			default:
				return 'балл';
		}
	};
	return (
		<div
			className="card"
			style={{
				backgroundColor: `${card.mobileAppDashboard.cardBackgroundColor}`,
			}}
		>
			<div className="first-box">
				<div
					className="title title__main"
					style={{ color: `${card.mobileAppDashboard.highlightTextColor}` }}
				>
					{card.mobileAppDashboard.companyName}
				</div>
				<img
					src={card.mobileAppDashboard.logo}
					alt="Logo"
					className="main__icon"
				/>
			</div>
			<div
				className="points"
				style={{ color: `${card.mobileAppDashboard.highlightTextColor}` }}
			>
				{card.customerMarkParameters.mark}{' '}
				<div
					className="label"
					style={{ color: `${card.mobileAppDashboard.textColor}` }}
				>
					{getNoun(card.customerMarkParameters.mark)}
				</div>
			</div>
			<div className="second-box">
				<div className="cashback">
					<div
						className="label label__primary"
						style={{ color: `${card.mobileAppDashboard.textColor}` }}
					>
						Кешбэк
					</div>
					{card.customerMarkParameters.loyaltyLevel.markToCash}%
				</div>
				<div className="base-level">
					<div
						className="label label__primary"
						style={{ color: `${card.mobileAppDashboard.textColor}` }}
					>
						Уровень
					</div>
					{card.customerMarkParameters.loyaltyLevel.name}
				</div>
			</div>
			<div className="third-box">
				<div
					className="eye"
					style={{ backgroundColor: `${card.mobileAppDashboard.mainColor}` }}
					onClick={() =>
						handleClick(`скрыть, id компании ${card.company.companyId}`)
					}
				></div>
				<div
					className="trash"
					style={{ backgroundColor: `${card.mobileAppDashboard.mainColor}` }}
					onClick={() =>
						handleClick(`удалить, id компании ${card.company.companyId}`)
					}
				></div>
				<button
					className="more"
					style={{
						backgroundColor: `${card.mobileAppDashboard.backgroundColor}`,
						color: `${card.mobileAppDashboard.mainColor}`,
					}}
					onClick={() =>
						handleClick(`подробнее, id компании ${card.company.companyId}`)
					}
				>
					Подробнее
				</button>
			</div>
			{modalMessage && (
				<Modal title={modalMessage} onClose={handleModalClose} />
			)}
		</div>
	);
};
