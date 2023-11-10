import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAddNewPostMutation } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({title, body: content, userId}).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('failed to save the post',err);
            } 
        }
    }


    const usersOptions = users.map((user,index) => (
        <option key={index} value={user.id}>
            {user.name}
        </option>
    ))

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor='postTitle'>Post TItle:</label>
            <input
            type='text'
            id='postTitle'
            name='postTitle'
            value={title}
            onChange={onTitleChanged}
            />
            <label htmlFor='postAuthor'>Author:</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                <option value=''></option>
                {usersOptions}
            </select>
            <label htmlFor='postContent'>Content:</label>
            <input
            type='text'
            id='postContent'
            name='postContent'
            value={content}
            onChange={onContentChanged}
            />
            <button onClick={onSavePostClicked} type='button' disabled={!canSave}>Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm