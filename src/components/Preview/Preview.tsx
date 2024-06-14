import mainLogo from '../../../public/logo.png';
import './Preview.css';

interface Props {
	previewOpen: boolean;
}

export const Preview = ({ previewOpen }: Props) => {
	return (
		<div className='logo-box'>
			{previewOpen && <img src={mainLogo} className="logo" alt="Main Logo" />}
		</div>
	);
};
