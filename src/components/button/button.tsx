import './button.css';

interface Props {
	onClickHandler: () => void;
}

const Button = ({onClickHandler} : Props) => {
	return (
		<button className='button' onClick={onClickHandler}>
			Отправить сообщение
		</button>
	)
}

export default Button;