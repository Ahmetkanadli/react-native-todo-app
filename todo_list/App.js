import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TodoScreen from "./screens/TodoScreen";
import TodoForm from "./screens/TodoForm";
import {TodoContextProvider} from "./store/TodoContext";
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import {AuthProvider} from "./store/AuthContex";

const Stack = createNativeStackNavigator();

const CustomHeaderTitle = () => (
    <Text style={styles.headerTitle}>
        <Text style={styles.headerTitlePart1}>to</Text>
        <Text style={styles.headerTitlePart2}>do</Text>
    </Text>
);

export default function App() {
    return (
        <AuthProvider>
            <TodoContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        contentStyle: { backgroundColor: '#191919' },
                        statusBarColor : '#0d0d0d',
                        headerStyle: { backgroundColor: '#0d0d0d' },
                        headerTintColor : 'white',
                        headerTitleAlign: 'center', // Başlık ortalama
                        headerTitle: props => <CustomHeaderTitle {...props} />
                    }}>
                        <Stack.Screen name={'Register'} component={RegisterScreen} />
                        <Stack.Screen name={'Login'} component={LoginScreen} />
                        <Stack.Screen name={'Todos'} component={TodoScreen} />
                        <Stack.Screen name={'TodoForm'} component={TodoForm} />
                    </Stack.Navigator>
                </NavigationContainer>
            </TodoContextProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        justifyContent : "center",
        alignItems : "center"
    },
    headerTitlePart1: {
        color: '#f3d03e', // Sarı renk
    },
    headerTitlePart2: {
        color: '#6455f7', // Mavi renk
    },
});
