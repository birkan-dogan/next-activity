import MainHeader from "./main-header";
import Notification from "../ui/notification";

import { useContext } from "react";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <div>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </div>
  );
};
export default Layout;
