import { IMessage } from '@/containers/App'
import './message.css'

const Message = ({ author, datetime, message }: IMessage) => {
	const date = new Date(datetime);
	const formattedDate =
		(date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`) + '.' +
		(date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`) +
		`.${date.getFullYear()} ` +
		(date.getHours() < 10 ? `0${date.getHours()}:` : `${date.getHours()}:`) + 
		(date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`);
	return (
		<p className='message__paragraph'>
			<span className='message__user'>
				{author}
			</span> ({formattedDate}): {message}
		</p>
	)
}

export default Message;