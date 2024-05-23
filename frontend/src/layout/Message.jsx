import { useState, useEffect } from 'react';
import bus from '../utils/bus';
import styles from './Message.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Message() {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        const flashListener = ({ message, type }) => {
            setMessage(message);
            setType(type);
            setVisibility(true);

            setTimeout(() => {
                setVisibility(false);
            }, 5000);  // 5 seconds
        };

        bus.addListener('flash', flashListener);

        return () => {
            bus.removeListener('flash', flashListener);
        };
    }, []);

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>
                <div className={styles['message-icon']}>
                    {type === 'success' && <FaCheck style={{ color: '#4CAF50' }} />}
                    {type === 'error' && <FaTimes style={{ color: '#F44336' }} />}
                </div>
                <div className={styles['message-content']}>{message}</div>
                <div className={styles['message-close']} onClick={() => setVisibility(false)}>
                    <FaTimes />
                </div>
                <div className={styles['message-timer']} style={{ width: visibility ? '100%' : '0%' }}></div>
            </div>
        )
    );
}

export default Message;
