import { StyleSheet } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Menu from "./assets/screens/voluntar/Menu";
import Login from "./assets/screens/Login";
import SetareParolaNoua from "./assets/screens/voluntar/SetareParolaNoua";
import MenuAdmin from "./assets/screens/admin/MenuAdmin";
import AddVoluntar from "./assets/screens/admin/AddVoluntar";
import IntroduceDate from "./assets/screens/voluntar/IntroduceDate";
import ListaActivitati from "./assets/screens/voluntar/ListaActivitati";
import GenerateQRCode from "./assets/screens/admin/GenerateQRCode";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="GenerareQRCode">
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
              <Stack.Screen name="SchimbareParola" component={SetareParolaNoua} options={{headerShown: false}}/>
              <Stack.Screen name="IntroducereDate" component={IntroduceDate} options={{headerShown: false}}/>
              <Stack.Screen name="MeniuVoluntar" component={Menu} options={{headerShown: false}}/>
              <Stack.Screen name="MeniuAdmin" component={MenuAdmin} options={{headerShown: false}}/>
              <Stack.Screen name="AddVoluntar" component={AddVoluntar} options={{headerShown: false}}/>
              <Stack.Screen name="AddActivity" component={ListaActivitati} options={{headerShown: false}}/>
              <Stack.Screen name="GenerareQRCode" component={GenerateQRCode} options={{headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
