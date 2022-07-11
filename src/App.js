import AppWrapper from "./components/AppWrapper/AppWrapper";
import { AuthContextProvider } from "./components/store/auth-context/auth-context";

const App = () => {
  return (
    <AuthContextProvider>
      <AppWrapper />
    </AuthContextProvider>
  );
};
export default App;
