import { CardHoverEffectDemo } from "../components/cards";
import ProtectedRoute from "../components/ProtectedRoute";

const HelloWorld = () => {
  return (
    <ProtectedRoute>
      <div>
       
        <CardHoverEffectDemo />
      </div>
    </ProtectedRoute>
  );
};

export default HelloWorld;
