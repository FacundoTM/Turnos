import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return navigate("./ingreso");
}

export default HomePage;
