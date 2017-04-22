import React from 'react';
import { withRouter } from 'react-router-dom';
import CrudCollection from './generics/CrudCollection';


export const Rooms = () => {
  return <CrudCollection name='rooms'/>
};

export const Furniture = withRouter((props) => {
  const roomId = parseInt(props.match.params.room, 10);
  return <CrudCollection name='furniture' prefix={`/${roomId}`} parentId={roomId} parentField='room' parentName='rooms'/>
});
