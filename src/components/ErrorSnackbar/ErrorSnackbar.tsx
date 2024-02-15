import {notification} from "antd";
import {memo} from "react";

export const ErrorSnackbar = memo(({error}: Props) => {
    const [api, contextHolder] = notification.useNotification();

    // const error = useSelector<AppRootState, string | null>((state) => state.app.error)

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
});

type Props = {
    error: string | null
}