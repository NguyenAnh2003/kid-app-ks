import { View, Text } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import globalStyle from '../styles/globalStyle';
import notifications from '../mock/notifi';
import NotificationCard from '../components/cards/NotificationCard';

const reducer = (state, action) => {};

const NotificationScreen = () => {
  /** */
  const [state, dispatch] = useReducer(reducer, {
    notifications: notifications,
    isFetching: true,
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        
      } catch (error) {
        
      }
    };

    /** func call */
    fetchNotifications();
  }, []);

  return (
    <View style={[globalStyle.container, { paddingHorizontal: 20, gap: 10 }]}>
      {state.notifications.map((i, idx) => (
        <NotificationCard
          id={i.id}
          childData={i.childId}
          description={i.description}
          date={i.date}
          key={idx}
        />
      ))}
    </View>
  );
};

export default NotificationScreen;
