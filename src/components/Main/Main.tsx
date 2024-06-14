import { ReactNode } from 'react';
import { ICompany } from '../../model/model';
import { useAppSelector } from '../../store/use-app';
import { Card } from '../Card/Card';
import './Main.css';
import { Preloader } from '../Preloader/Preloader';

interface Props {
	children?: ReactNode;
	isLoading: boolean;
}

const Main = ({isLoading}: Props) => {
	const cards = useAppSelector((state) => state.item);
	return (
		<div className="main">
			{!cards.length && !isLoading &&<div className='not-found'>Нет компаний</div>}
			{cards?.map((card: ICompany) => (
				<div key={card?.company?.companyId}>
					<Card card={card}/>
				</div>
			))}
			{isLoading && <Preloader />}
		</div>
	);
};

export default Main;
