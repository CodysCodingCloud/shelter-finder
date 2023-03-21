import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Welcome() {
  const user = useAppSelector((state) => state.user);
  return (
    <section>
      {user.firstName ? (
        <h1>hello a {user.firstName}</h1>
      ) : (
        <h1>hello my friends</h1>
      )}
    </section>
  );
}
