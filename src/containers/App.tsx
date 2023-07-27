import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Message from '@/components/message/message';
import './App.css';

export interface IMessage {
	_id: string;
	author: string;
	datetime: string;
	message: string;
}

const App = () => {
	const [nameInput, setNameInput] = useState('');
	const [messageInput, setMessageInput] = useState('');
	const [messages, setMessages] = useState<IMessage[]>([]);

	const changeNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
		setNameInput(event.target.value)
	}
	const changeMessageHandle = (event: ChangeEvent<HTMLInputElement>) => {
		setMessageInput(event.target.value)
	}

	const request = async(url:string) => {
		const response = await fetch(url);
			if (response.ok) {
				const data: Awaited<Promise<IMessage[]>> = await response.json();
				setMessages(() => [...messages, ...data]);
			}
	}
	
	const getMessages = useCallback(async() => {
		if (messages.length < 1) request(`http://146.185.154.90:8000/messages`);
		else {
			const lastDatetime = messages[messages.length - 1].datetime;
			request(`http://146.185.154.90:8000/messages?datetime=${lastDatetime}`);
		}
	}, [messages]);

	const sendMessage = async () => {
		const encodedMessageData = new URLSearchParams({message: messageInput, author: nameInput});
		try {
			const response = await fetch('http://146.185.154.90:8000/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: encodedMessageData,
			});
			if (response.ok) {
				setNameInput('');
				setMessageInput('');
			}
			else throw new Error('Failed to send your  message');
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			getMessages()
		}, 1000);
		return () => {
			clearInterval(intervalId);
		}
	}, [getMessages])
	
	const reversedMessages = [...messages].reverse();

  return (
		<div className='app'>
			<div className='form__container'>
				<Input
					placeholder='Enter your name'
					value={nameInput}
					onChangeHandler={changeNameHandle}
				/>
				<Input
					placeholder='Enter a message'
					value={messageInput}
					onChangeHandler={changeMessageHandle}
				/>
				<Button onClickHandler={sendMessage} />
			</div>
			{reversedMessages.map((message) =>
				<Message
					key={message._id}
					_id={message._id}
					author={message.author}
					datetime={message.datetime}
					message={message.message} />
			)}
    </div>
  )
}

export default App
