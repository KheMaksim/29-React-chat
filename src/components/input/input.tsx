import { ChangeEvent } from 'react';
import './input.css';

interface Props {
	placeholder: string;
	value: string;
	onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({placeholder, value, onChangeHandler}: Props) => {
	return (
		<input
			className="form__input"
			placeholder={placeholder}
			type="text"
			value={value}
			onChange={onChangeHandler}
		/>
	)
}

export default Input;