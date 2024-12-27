import Swal from "sweetalert2";

export const confirmCORejection = async () => {
  const response = await Swal.fire({
    icon: "question",
    title: "Reject change order?",
    input: "textarea",
    inputPlaceholder: "Type a rejection message",
    customClass: {
      popup: "swal-container",
      confirmButton: "swal-confirm",
      input: "swal-input",
      title: "swal-title",
    },
  });
  return response;
};
