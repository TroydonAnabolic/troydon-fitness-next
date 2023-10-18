// import React, { useEffect } from "react";

// interface ModalProps {
//   showModal: boolean;
//   closeModal: () => void;
//   message: string;
// }

// const ModalX: React.FC<ModalProps> = ({ showModal, closeModal, message }) => {
//   useEffect(() => {
//     if (showModal) {
//       document.getElementById("my_modal")?.showModal();
//     } else {
//       document.getElementById("my_modal")?.close();
//     }
//   }, [showModal]);

//   return (
//     <div>
//       <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Hello!</h3>
//           <p className="py-4">
//             Press ESC key or click the button below to close
//           </p>
//           <div className="modal-action">
//             <form method="dialog">
//               {/* if there is a button in form, it will close the modal */}
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };
// {
//   /* Open the modal using document.getElementById('ID').showModal() method */
// }
// {
//   /* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */
// }
// export default ModalX;
