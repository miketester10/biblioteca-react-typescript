import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

interface ErrorEmailJs {
  text: string;
  status: number;
}

const Contatti = () => {
  const form = useRef() as React.MutableRefObject<HTMLFormElement>;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // const formData: FormData = new FormData(form.current);
    // const name = formData.get("from_name") as string;
    // const email = formData.get("user_email") as string;
    // const message = formData.get("message") as string;
    // console.log(name, email, message);

    emailjs
      .sendForm("service_8ncvt8q", "template_limtxda", form.current, {
        publicKey: "MoBKBtn5dFVi0JDx0",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error: unknown) => {
          if (error instanceof Error) {
            console.log(error);
            return;
          }
          const text = (error as ErrorEmailJs).text;
          const status = (error as ErrorEmailJs).status;
          console.log(`FAILED...Message: ${text}, Status code: ${status}`);
        }
      );
  };

  return (
    <form ref={form} method="POST" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <label>Inserisci file</label>
      <input type="file" name="my_file" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Contatti;
