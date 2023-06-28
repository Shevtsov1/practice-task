import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/scrum.png';

const Navbar = () => {

    // Проверка, находится ли пользователь на странице настроек профиля
    const isProfileSettingsPage = window.location.pathname === "/profileSettings";

    // Получение списка пользователей из localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Поиск в списке залогиненного пользователя
    const loggedInUser = userList.find(user => user.userData.loggedIn === true);

    // Инициализация хука для перехода на другую страницу
    const navigate = useNavigate();

    // Обработчик клика на логотипе
    const handleLogoClick = () => {
        navigate('/home');
        window.location.reload();
    };

    // Обработчик нажатия кнопки "Logout"
    const handleLogout = () => {
        // Обновляем список пользователей, устанавливая флаг loggedIn на false для залогиненного пользователя
        const updatedUserList = userList.map(user => {
            if (user.userData.loggedIn === true) {
                user.userData.loggedIn = false;
            }
            return user;
        });

        // Сохраняем обновленный список пользователей в localStorage
        localStorage.setItem('userList', JSON.stringify(updatedUserList));

        // Переходим на страницу авторизации
        navigate('/SignIn');
    };

    // Обработчик нажатия кнопки "Delete"
    const handleDeleteUser = () => {
        // Удаляем залогиненного пользователя из списка пользователей
        const updatedUserList = userList.filter(user => user.userData.loggedIn !== true);

        // Сохраняем обновленный список пользователей в localStorage
        localStorage.setItem('userList', JSON.stringify(updatedUserList));

        // Переходим на страницу авторизации
        navigate('/SignIn');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                {/* Логотип */}
                <button className="navbar-brand d-flex align-items-center text-white" onClick={handleLogoClick}>
                    <img src={Logo} alt="logo" className="me-2 logo"/>
                    <h3 className="mb-0 logo-name fw-bold">Scrum</h3>
                </button>

                {/* Кнопки профиля */}
                <div className="collapse navbar-collapse justify-content-end">
                    <div className="navbar-nav">
                        <div className="nav-item dropdown">
                            <button
                                className="btn btn-secondary btn-profile dropdown-toggles container text-truncate"
                                type="button"
                                id="userAccountDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {/* Имя залогиненного пользователя */}
                                {loggedInUser ? loggedInUser.userData.username : "User Account"}
                            </button>

                            {/* Меню профиля */}
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userAccountDropdown">
                                {loggedInUser ? (
                                    // Пункт "Settings" (активный или неактивный, в зависимости от текущей страницы)
                                    isProfileSettingsPage ? (
                                        <li>
                                            <button className="dropdown-item disabled" onClick={handleDeleteUser}>
                                                Delete
                                            </button>
                                        </li>
                                    ) : (
                                        <li>
                                            <button className="dropdown-item " onClick={handleDeleteUser}>
                                                Delete
                                            </button>
                                        </li>
                                    )
                                ) : null}

                                {/* Пункт "Logout" */}
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;