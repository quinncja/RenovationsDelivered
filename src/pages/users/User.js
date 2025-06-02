import { UserSvg, adminSvg } from "business/svg";

function User(props) {
  const { user } = props;

  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  };

  const dateToString = (date) => {
    return date.toLocaleString("en-US", dateOptions);
  };

  const hasAdmin = (user) => {
    return user.authorization.xbpwwqmn.roles.includes("admin");
  };

  return (
    <div className="user-card">
      <div className="background-icon">
        {" "}
        {hasAdmin(user) ? adminSvg() : UserSvg()}{" "}
      </div>
      <div className="card-left">
        <h3> {user.name} </h3>
        <p title="Last Active"> {dateToString(new Date(user.lastActiveAt))} </p>
      </div>
    </div>
  );
}

export default User;
