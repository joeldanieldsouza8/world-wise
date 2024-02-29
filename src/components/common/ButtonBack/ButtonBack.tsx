import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

function ButtonBack() {
  const navigate = useNavigate();

  function handleGoBack(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    navigate(-1);
  }

  return (
    <Button type="back" onClick={handleGoBack}>
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
