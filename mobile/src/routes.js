import React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewStack = createStackNavigator();

function NewStackScreen({ navigation }) {
  return (
    <NewStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: { marginLeft: 20 },
      }}
    >
      <NewStack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          headerTitle: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewStack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          headerTitle: 'Selecione o horário',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectProvider')}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewStack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectDateTime')}
            >
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </NewStack.Navigator>
  );
}

export default (signedIn = false) => {
  return (
    <NavigationContainer>
      {!signedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#fff',
            inactiveTintColor: 'rgba(255,255,255,0.6)',
            style: { backgroundColor: '#8d41a8' },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarLabel: 'Agendamentos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="event" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="New"
            component={NewStackScreen}
            options={{
              headerShown: false,
              tabBarVisible: false,
              tabBarLabel: 'Agendar',
              tabBarIcon: ({ color, size }) => (
                <Icon name="add-circle-outline" size={size} color={color} />
              ),
              unmountOnBlur: true,
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: 'Meu Perfil',
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
