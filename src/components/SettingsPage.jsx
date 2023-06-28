import React from 'react';
import Navbar from "./bars/Navbar";
import Sidebar from "./bars/Sidebar";
import "../styles/Reset.css";
import "../styles/App.css";

const SettingsPage = ({handleLogout}) => {

    // Получение списка пользователей из localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Поиск в списке залогиненного пользователя
    const loggedInUser = userList.find(user => user.userData.loggedIn === true);

    return (
        <div className="settings">
            <section className="section-header z-1">
                <Navbar/>
            </section>
            <section className="section-main section-main-100 z-0">

            </section>
        </div>
    );
};

export default SettingsPage;