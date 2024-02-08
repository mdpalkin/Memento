import {notification} from "antd";
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store.ts";

export const ErrorSnackbar = () => {
    const [api, contextHolder] = notification.useNotification();

    const error = useSelector<AppRootState, string | null>((state) => state.app.error)

    const openNotificationWithIcon = (error: string) => {
        api['error']({
            message: 'An error has been detected',
            description: error
        });
    };
    const isOpen = error !== null

    return (
        <>      {contextHolder}
                {isOpen && openNotificationWithIcon(error)}
        </>
    );
};
