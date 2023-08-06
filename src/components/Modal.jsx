import SignPage from "../pages/SignPage";
import LoginPage from "../pages/LoginPage";

import "../assets/css/modal.css";
import "../assets/css/sign-login.css";

export default function Modal({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  setToken,
}) {
  const closeSignModal = () => {
    setSignModal(() => false);
  };

  const closeLoginModal = () => {
    setLoginModal(() => false);
  };

  return (
    <div
      className="modal-window"
      onClick={loginModal ? closeLoginModal : closeSignModal}
    >
      <div className="modal-bloc" onClick={(event) => event.stopPropagation()}>
        {signModal && (
          <button className="close-button" onClick={closeSignModal}>
            X
          </button>
        )}
        {loginModal && (
          <button className="close-button" onClick={closeLoginModal}>
            X
          </button>
        )}
        {signModal && (
          <SignPage
            signModal={signModal}
            setSignModal={setSignModal}
            setToken={setToken}
          />
        )}
        {loginModal && (
          <LoginPage
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            setToken={setToken}
          />
        )}
      </div>
    </div>
  );
}
