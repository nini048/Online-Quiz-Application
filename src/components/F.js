import React from 'react';

const F = ({View, user}) => {
  return (
    <div key={user.id} className={user.age > 18 ? 'green' : 'red'}>
      <div>My id: {user.id}</div>
      <div>My name: {user.name}</div>
      <div>My age: {user.age}</div>
      <hr />
    </div>
  );
};

export default F;

const styles = StyleSheet.create({});
