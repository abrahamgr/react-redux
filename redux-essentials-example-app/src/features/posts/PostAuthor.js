import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserById } from '../users/usersSlice';

export const PostAuthor = ({ userId }) => {
  // const author = useSelector(state =>
  //   state.users.find(user => user.id === userId)
  // );

  const author = useSelector(state => selectUserById(state, userId));

  return <Link to={`/users/${userId}`}>by {author ? author.name : 'Unknown author'}</Link>;
  // return <span>by {author ? author.name : 'Unknown author'}</span>;
}