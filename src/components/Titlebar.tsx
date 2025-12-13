import { MdOutlineMinimize, MdOutlineClose } from "react-icons/md";

export function Titlebar() {
  async function handleCloseClick() {
    await window.app.appClose();
  }

  async function handleMinimizeClick() {
    await window.app.appMinimize();
  }

  return (
    <>
      <div className="titlebar">
        <div className="titlebar__buttons">
          <button onClick={handleMinimizeClick}>
            <MdOutlineMinimize />
          </button>
          <button onClick={handleCloseClick}>
            <MdOutlineClose />
          </button>
        </div>
      </div>
    </>
  );
}
