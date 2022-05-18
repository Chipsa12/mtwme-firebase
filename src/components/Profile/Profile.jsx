import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar, deleteAvatar} from '../../actions/uploadFile';
import Button from '../UI/button/Button'
import InputFile from '../UI/inputFile/InputFile'
import InputMessage from '../UI/inputMessage/InputMessage';
import { DEFAULT_AVATAR_URL } from '../../config/config';
import { getUsers } from '../../actions/user';

import styles from './Profile.module.css'

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])
    const { id } = useParams();
    const { users } = useSelector(state => state.user)
    const user = users[id];
    const [showInputMessage, setShowInputMessage] = useState(false);
    const changeHandler = (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                dispatch(uploadAvatar(file, user.id));
            } catch (e) {
                console.log(e)
            }
        }
    }

    const clickHandle = () => {
        if (user.avatar !== DEFAULT_AVATAR_URL) {
            dispatch(deleteAvatar(user.id))
        }
    }

    return (
        <>
        {
            showInputMessage && <div className={styles.inputMessage}>
                <InputMessage userId={id} cb={setShowInputMessage}/>
            </div>
        }
        <div className={styles.profile}>
            <div className={styles.profileRight}>
                <div className={styles.profileRightTop}>
                    <div className={styles.profileCover}>
                        <img
                            className={styles.profileCoverImg}
                            src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2FprofileBg.jpg?alt=media&token=73ebbe25-e8be-48b7-aa98-c3bf30dc707f' 
                            alt="background profile"
                        />
                        {
                            <img
                                className={styles.profileUserImg}
                                src={user.avatar} 
                                alt="avatar"
                            />
                        }
                        <div className={user.token ? styles.onLine : styles.offLine}></div>
                    </div>
                    <div className={styles.profileInfo}>
                        <h4 className={styles.profileInfoName}>{user.surname} {user.name}</h4>
                    </div>
                    {
                        user.token === localStorage.getItem('token') 
                        ?
                        <div className={styles.changeAvatar}>
                            <Button onClick={clickHandle}>Удалить аватар</Button>
                            <InputFile onChange={changeHandler}>Загрузить аватар</InputFile> 
                        </div>
                        :
                        <div className={styles.sendMessage}>
                            <Button onClick={()=> setShowInputMessage(prev => !prev)}>Отправить сообщение</Button> 
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;