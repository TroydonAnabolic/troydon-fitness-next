import { signIn } from "next-auth/react";

type Props = {
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDialogElement>;
};

const SignupModal = ({ closeModal, modalRef }: Props) => {
  const closeModalHandler = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <button className="btn" onClick={closeModal}>
        Reveal Secrets to getting ripped
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Reveal All Blogposts!</h3>
          <p className="py-4">
            Sign Up or Login to see remaining blogposts, and uncover the secrets
            of getting ripped!
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-primary text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => signIn()}
              >
                Sign in
              </button>
              <button
                className="btn btn-warning text-white font-bold py-2 px-4 rounded ml-2"
                onClick={closeModalHandler}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignupModal;
