import { outLogin } from "@/services/ant-design-pro/api";
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { history, useModel } from "@umijs/max";
import { Avatar, Menu, Spin } from "antd";
import { stringify } from "querystring";
import { useCallback } from "react";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
    await outLogin();
    const { search, pathname } = history.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get("redirect");
    // Note: There may be security issues, please note
    if (window.location.pathname !== "/user/login" && !redirect) {
        history.replace({
            pathname: "/user/login",
            search: stringify({
                redirect: pathname + search,
            }),
        });
    }
};

const AvatarDropdown = ({ menu }) => {
    const { initialState, setInitialState } = useModel("@@initialState");

    const onMenuClick = useCallback(
        (event) => {
            const { key } = event;
            if (key === "logout") {
                setInitialState((s) => ({ ...s, currentUser: undefined }));
                loginOut();
                return;
            }
            history.push(`/account/${key}`);
        },
        [setInitialState]
    );

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.userName) {
        return loading;
    }

    const menuItems = [
        ...(menu
            ? [
                  {
                      key: "center",
                      icon: <UserOutlined />,
                      label: "个人中心",
                  },
                  {
                      key: "settings",
                      icon: <SettingOutlined />,
                      label: "个人设置",
                  },
                  {
                      type: "divider",
                  },
              ]
            : []),
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
        },
    ];

    const menuHeaderDropdown = (
        <Menu
            className={styles.menu}
            selectedKeys={[]}
            onClick={onMenuClick}
            items={menuItems}
        />
    );

    return (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} alt="avatar" />
                <span className={`${styles.name} anticon`}>
                    {currentUser.userName}
                </span>
            </span>
        </HeaderDropdown>
    );
};

export default AvatarDropdown;
