import { FormEvent, useState } from "react";
import styles from "../styles/ChangePassword.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Пароли не совпадают!");
      return;
    }
    postRequest();
    setMessage("Пароль успешно изменён!");
  };

  const postRequest = async () => {
    try{
        const response = await axios.post("http://localhost:5293/api/v1/Account/ChangePassword", {
                newPassword: newPassword,
                token: token
            }
        );
        console.log(response.data);
    } catch(error){
        console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Изменение пароля</h2>
        {message && <p className={styles.message}>{message}</p>}
        <label>
          Новый пароль:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Подтвердите пароль:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Сменить пароль</button>
      </form>
    </div>
  );
}
