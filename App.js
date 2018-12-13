import { createAppContainer, createStackNavigator } from "react-navigation";
import AddCity from "./AddCity";
import CityDetails from "./CityDetails";
import { Home } from "./Home";

const stackNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    AddCity: { screen: AddCity },
    CityDetails: { screen: CityDetails },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);

const appContainer = createAppContainer(stackNavigator);

export default appContainer;
